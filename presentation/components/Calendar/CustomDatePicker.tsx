import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Définition du type pour stocker les tâches
interface TaskData {
  annotations: string[];
  count: number;
}

const CustomDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Record<string, TaskData>>({
    "2025-02-01": { annotations: ["Réunion à 14h"], count: 3 },
    "2025-02-02": { annotations: ["Livrer le projet"], count: 1 },
  });

  // Fonction pour formater la date en "YYYY-MM-DD"
  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  // Fonction pour ajouter une annotation
  const handleAddAnnotation = () => {
    const dateStr = formatDate(selectedDate);
    const newAnnotation = prompt("Ajoute une annotation :");
    
    if (newAnnotation) {
      setTasks((prev) => ({
        ...prev,
        [dateStr]: {
          annotations: [...(prev[dateStr]?.annotations || []), newAnnotation],
          count: (prev[dateStr]?.count || 0) + 1,
        },
      }));
    }
  };

  const dateStr = formatDate(selectedDate);
  const currentTasks = tasks[dateStr] || { annotations: [], count: 0 };

  return (
    <div style={{ textAlign: "center", maxWidth: 400, margin: "auto" }}>
      <h3>Sélectionne une date</h3>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => date && setSelectedDate(date)}
        inline
      />
      <div style={{ marginTop: 20, padding: 10, border: "1px solid #ddd", borderRadius: 8 }}>
        <h4>📅 {dateStr}</h4>
        <p><strong>{currentTasks.count} tâches</strong></p>
        <ul>
          {currentTasks.annotations.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
        <button onClick={handleAddAnnotation}>➕ Ajouter une annotation</button>
      </div>
    </div>
  );
};

export default CustomDatePicker;

import { ITask, ITaskBoard, ITasksByDate } from "@/domain/entities/task.entities";
import { StatusStateEnum } from "@/domain/enum/StatusStateEnum";
import { TaskPhasesEnum, TaskTypeEnum } from "@/domain/enum/TaskEnum";
import moment from "moment";

export const getMonthsOfYear = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months;
  };
  
export   const getDaysOfYear = (year : number) => {
    const days = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Nombre de jours dans le mois
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day).toISOString().split('T')[0]);
      }
    }
    return days;
  };
  


  export function convertToLocalDate(dateInput: string | Date, format?: string) : string {
    
    const now = new Date(dateInput);
    const offset = now.getTimezoneOffset(); // Offset in minutes (negative means ahead of UTC)
    const formattedDate = new Date(now.getTime() - offset * 60000); 
      if (!format) {
          return  moment(formattedDate).toLocaleString();
      }

      return moment(formattedDate).format(format);
    }

    export function convertToISO(dateInput: string): string {
      try {
          // Remplacer l'espace par un "T" pour le format ISO si nécessaire
          const normalizedInput = dateInput.includes("T") ? dateInput : dateInput.replace(" ", "T");
  
          // Créer un objet Date à partir de l'entrée
          const date = new Date(normalizedInput);
  
          // Vérification pour s'assurer que la date est valide
          if (isNaN(date.getTime())) {
              throw new Error("Date invalide ou mal formatée");
          }
  
          // Convertir la date en format ISO en UTC
          return date.toISOString();
      } catch (error) {
          return `Erreur : ${(error as Error).message}`;
      }
  }
  
    
export function getColorActivities(tasks: ITask[]) : string {
  let color = 0;

  if (tasks.every(task => task.type.name === TaskTypeEnum.OWN)) {
    color = 1;
  } else if (tasks.every(task => task.type.name === TaskTypeEnum.ASSIGN)) {
    color = 2;
  } else {
    color = 3;
  }
  return color === 1 ? 'bg-yellow-400 dark:bg-yellow-400' : (color === 2  ? 'bg-blue-400 dark:bg-blue-400' : 'bg-green-400 dark:bg-green-400')
}

export function getNextTaskPhase (phase : TaskPhasesEnum) : TaskPhasesEnum|null {
  if (phase === TaskPhasesEnum.Backlog) {
    return TaskPhasesEnum.Started
  }
  if (phase === TaskPhasesEnum.Started) {
    return TaskPhasesEnum.InReview
  }
  if (phase === TaskPhasesEnum.InReview) {
    return TaskPhasesEnum.Done
  }
  return null;
}

export function getPreviousTaskPhase (phase : TaskPhasesEnum) : TaskPhasesEnum|null {
  if (phase === TaskPhasesEnum.Done) {
    return TaskPhasesEnum.InReview
  }
  if (phase === TaskPhasesEnum.InReview) {
    return TaskPhasesEnum.Started
  }
  if (phase === TaskPhasesEnum.Started) {
    return TaskPhasesEnum.Backlog
  }
  return null;
}

const tailwindColors : Record<string, string>  = {
 'yellow-400': '#fbbf24',
  'blue-400': '#60a5fa',
  'green-400': '#4ade80',
  'red-400': '#f87171',
  'purple-400': '#a78bfa',
  'pink-400': '#f472b6',
  'orange-400': '#fb923c',
  'indigo-400': '#818cf8',
  'slate-400': '#64748b',
};



export function getTailwindColor(color: string): string {
  return tailwindColors[color] || '';
}

export const colorOptions = [
  { label: 'Yellow', value: 'yellow-400' },
  { label: 'Blue', value: 'blue-400' },
  { label: 'Green', value: 'green-400' },
  { label: 'Red', value: 'red-400' },
  { label: 'Purple', value: 'purple-400' },
  { label: 'Pink', value: 'pink-400' },
  { label: 'Orange', value: 'orange-400' },
  { label: 'Indigo', value: 'indigo-400' },
  { label: 'Slate', value: 'slate-400' },
];

export const getMonthsOfYear = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months;
  };
  
  // Fonction pour obtenir tous les jours de l'année (format: "YYYY-MM-DD")
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
  
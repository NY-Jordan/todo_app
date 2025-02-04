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
  
    

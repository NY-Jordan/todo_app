import React from 'react';

export default function Pagination({
  totalPages,
  currentPage,
  onChange,
  name
}: {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  name : string
}) {
  const generateButtons = () => {
    if (totalPages <= 10) {
      // Si le total des pages est inférieur ou égal à 10, afficher toutes les pages
      return Array.from({ length: totalPages }, (_, index) => {
        return (
        <input
        key={`page-${index + 1}`}
        className="join-item btn btn-square"
          type="radio"
          name={name}
          aria-label={(index + 1).toString()}
          onClick={() => onChange(index + 1)}
          defaultChecked={currentPage === (index + 1)}
        />
      ) });
    } else {
      // Si le total des pages est supérieur à 10, appliquer la logique de points de rupture
      const buttons = [];

      // Ajouter les trois premières pages
      for (let i = 1; i <= 2; i++) {
        buttons.push(
          <input
            key={`start-${i}`}
            className="join-item btn btn-square"
            type="radio"
            name={name}
            aria-label={i.toString()}
            onClick={() => onChange(i)}
            defaultChecked={currentPage === i}
          />
        );
      }

      // Ajouter les pages autour de la page actuelle si nécessaire
      if (currentPage >= 3 && currentPage <= totalPages - 3) {
        buttons.push(<span key="dots-before" className="join-item btn">...</span>);
        // Pages autour de la page actuelle
        for (let i = currentPage -1; i <= currentPage + 1; i++) {
          buttons.push(
            <input
              key={`middle-${i}`}
              className="join-item btn btn-square"
              type="radio"
              name={name}
              aria-label={i.toString()}
              onClick={() => onChange(i)}
              defaultChecked={currentPage === i}
            />
          );
        }

        buttons.push(<span key="dots-after" className="join-item btn">...</span>);
      } else {
        buttons.push(<span key="dots-before" className="join-item btn">...</span>);
      }

      // Ajouter les trois dernières pages
      for (let i = totalPages - 2; i <= totalPages; i++) {
        buttons.push(
          <input
            key={`end-${i}`}
            className="join-item btn btn-square"
            type="radio"
            name={name}
            aria-label={i.toString()}
            onClick={() => onChange(i)}
            defaultChecked={currentPage === i}
          />
        );
      }

      return buttons;
    }
  };

  return (
    <>
      <div className="join my-4 justify-end flex">
        {generateButtons()}
      </div>
    </>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { setSortOption } from "../../redux/actions";
import "./SortOption.css";

const SortOption = () => {
  const dispatch = useDispatch();

  const handleSortChange = async (event) => {
    const selectedOption = event.target.value;
    dispatch(setSortOption(selectedOption));
  };

  return (
    <div>
      <label htmlFor="sortOption" className="sort-option-label">
        Ordenar por:
      </label>
      <select
        id="sortOption"
        className="sort-option-select"
        onChange={handleSortChange}
      >
        <option value="Desc">Descendente</option>
        <option value="Asc">Ascendente</option>
        <option value="diets">Por Dietas</option>
        <option value="Origen">Origen</option>
        <option value="healthScore">Comida Saludable</option>
      </select>
    </div>
  );
};

export default SortOption;

//   Botones/Opciones para filtrar por tipo de dieta, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por "comida saludable" (health score).

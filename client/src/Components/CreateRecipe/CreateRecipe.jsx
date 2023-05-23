import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./CreateRecipe.css";

const CreateRecipe = (props) => {
  //States///
  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [dietId, setDietId] = useState([]);
  const [steps, setSteps] = useState([
    {
      number: 1,
      step: "",
    },
  ]);
  const [image, setImage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Handlers  //
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormErrors({ ...formErrors, title: "" });

    if (!/^[a-zA-Z]{4}.*$/.test(title)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        title: "Nombre inválido",
      }));
    }
    setForm((prevForm) => ({ ...prevForm, title: title }));
  };
  const handleSummaryChange = (e) => {
    const summary = e.target.value;
    setFormErrors({ ...formErrors, summary: "" });

    if (!summary) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        summary: "Resumen requerido",
      }));
    } else if (summary.length > 150) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        summary: "No puede tener más de 150 caracteres",
      }));
    }
    setForm((prevForm) => ({ ...prevForm, summary: summary }));
  };

  const handleHealthScoreChange = (e) => {
    const healthScore = e.target.value;
    setFormErrors({ ...formErrors, healthScore: "" });

    if (healthScore < 0 || healthScore > 100) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        healthScore: "Solo se aceptan números entre 0 y 100",
      }));
    }

    setForm((prevForm) => ({ ...prevForm, healthScore: healthScore }));
  };

  const handleDietIDChange = (e) =>
    setDietId(Array.from(e.target.selectedOptions, (option) => option.value));

  const handleImageChange = (e) => {
    const image = e.target.value;
    setFormErrors({ ...formErrors, image: "" });

    if (!/^https?:\/\/.+$/.test(image)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        image: "URL inválida",
      }));
    }

    setImage(image);
  };
  const handleStepChange = (index, key, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][key] = value;
    setSteps(updatedSteps);
  };

  const addStep = () => {
    const updatedSteps = [...steps];
    updatedSteps.push({
      number: updatedSteps.length + 1,
      step: "",
    });
    setSteps(updatedSteps);
  };
  const removeStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title: form.title,
      image: image,
      summary: form.summary,
      healthScore: form.healthScore,
      steps: steps,
      dietId: dietId,
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_API || "http://localhost:3001/recipes/create",
        newRecipe
      );
      console.log(response);
      setForm({
        title: "",
        summary: "",
        healthScore: 0,
      });
      setSteps([
        {
          number: 1,
          step: "",
        },
      ]);
      setImage("");
      setDietId([]);
      setSuccessMessage("¡La receta se creó exitosamente!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      {successMessage && <p className="success-message">{successMessage}</p>}

      <p className="heading">Crear nueva receta</p>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre"
          className={formErrors.title ? "error-input" : ""}
          id="title"
          value={form.title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Resumen"
          className={formErrors.summary ? "error-input" : ""}
          id="summary"
          value={form.summary}
          onChange={handleSummaryChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="healthScore">¿Que tan saludable es?</label>
        <input
          type="number"
          className={formErrors.healthScore ? "error-input" : ""}
          id="healthScore"
          value={form.healthScore}
          onChange={handleHealthScoreChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="image.jpg"
          className={formErrors.image ? "error-input" : ""}
          id="image"
          value={form.image}
          onChange={handleImageChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Diets">Dietas:</label>
        <select multiple={true} value={dietId} onChange={handleDietIDChange}>
          <option value="1">Gluten Free</option>
          <option value="2">Dairy Free</option>
          <option value="3">Lacto Ovo Vegetarian</option>
          <option value="4">Vegan</option>
          <option value="5">Paleolithic</option>
          <option value="6">Primal</option>
          <option value="7">Whole 30 </option>
          <option value="8">Pescatarian</option>
          <option value="9">Ketogenic</option>
          <option value="10">Fodmap friendly</option>
        </select>
      </div>
      <div className="form-group">
        <label>Paso a paso:</label>
        {steps.map((step, index) => (
          <div key={index} className="step-container">
            <input
              type="text"
              placeholder={`Paso ${step.number}`}
              className="form-control"
              value={step.step}
              onChange={(e) => handleStepChange(index, "step", e.target.value)}
            />
            {index > 0 && (
              <button
                type="button"
                className="remove-step-btn"
                onClick={() => removeStep(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-step-btn" onClick={addStep}>
          Agregar paso
        </button>
      </div>

      <button
        className="form-button"
        type="submit"
        disabled={
          !form.title ||
          !form.summary ||
          !form.healthScore ||
          !steps ||
          !image ||
          !dietId
        }
      >
        Crear Receta
      </button>
    </form>
  );
};

export default CreateRecipe;

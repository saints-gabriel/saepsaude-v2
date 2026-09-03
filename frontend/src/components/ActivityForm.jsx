import { useState } from "react";
import styles from "../styles/Globals.module.css";
import activityApi from "../services/api.js";



function ActivityForm({ onCreate, onCancel }) {
  const [form, setForm] = useState({
    type: "",
    distance: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  function validate() {
    const newErrors = {};

    if (!form.type) {
      newErrors.type = "Campo obrigatório";
    }

    if (!form.distance) {
      newErrors.distance = "Campo obrigatório";
    }

    if (!form.duration) {
      newErrors.duration = "Campo obrigatório";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const newActivity = {
      id: Date.now(),
      type: form.type,
      distance: Number(form.distance),
      duration: Number(form.duration),
    };

    const response = activityApi(newActivity);

    onCreate(newActivity);

    setForm({
      type: "",
      distance: "",
      duration: "",
    });
  }

  return (
    <section className={styles.activityFormContainer}>
      <h1>Crie sua atividade</h1>

      <form onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label htmlFor="type">
            Tipo da atividade
          </label>

          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className={errors.type ? styles.inputError : ""}
          >
            <option value="">
              Selecione uma atividade
            </option>

            <option value="corrida">
              Corrida
            </option>

            <option value="caminhada">
              Caminhada
            </option>

            <option value="trilha">
              Trilha
            </option>
          </select>

          {errors.type && (
            <span className={styles.errorMessage}>
              {errors.type}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="distance">
            Distância percorrida (metros)
          </label>

          <input
            id="distance"
            name="distance"
            type="number"
            min="1"
            placeholder="Ex.: 5000"
            value={form.distance}
            onChange={handleChange}
            className={errors.distance ? styles.inputError : ""}
          />

          {errors.distance && (
            <span className={styles.errorMessage}>
              {errors.distance}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="duration">
            Duração da atividade (minutos)
          </label>

          <input
            id="duration"
            name="duration"
            type="number"
            min="1"
            placeholder="Ex.: 45"
            value={form.duration}
            onChange={handleChange}
            className={errors.duration ? styles.inputError : ""}
          />

          {errors.duration && (
            <span className={styles.errorMessage}>
              {errors.duration}
            </span>
          )}
        </div>

        <div className={styles.formButtons}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Voltar
          </button>

          <button
            type="submit"
            className={styles.createActivityButton}
          >
            Criar Atividade
          </button>
        </div>

      </form>
    </section>
  );
}

export default ActivityForm;
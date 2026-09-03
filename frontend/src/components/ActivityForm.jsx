import { useState } from "react";
import styles from "../styles/Globals.module.css";
import { criarAtividade } from "../services/api.js";

function ActivityForm({ onCreate, onCancel }) {

  // Guarda os dados digitados no formulário
  const [form, setForm] = useState({
    type: "",
    distance: "",
    duration: "",
  });

  // Guarda as mensagens de erro
  const [errors, setErrors] = useState({});

  // Executada quando o usuário altera algum campo
  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    // Remove o erro daquele campo
    setErrors({
      ...errors,
      [name]: "",
    });
  }

  // Verifica se todos os campos foram preenchidos
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

  // Executada quando o usuário clica em "Criar Atividade"
  async function handleSubmit(event) {
    event.preventDefault();

    // Para a função caso exista algum erro
    if (!validate()) {
      return;
    }

    // Cria o objeto que será enviado para o backend
    const novaAtividade = {
      tipo_atividade: form.type,
      distancia_percorrida: Number(form.distance),
      duracao_atividade: Number(form.duration),
      quantidade_calorias: Number(form.distance) * 0.05,
      usuario_id: null,
    };

    try {

      // Envia a atividade para o backend
      const atividadeSalva = await criarAtividade(novaAtividade);

      // Envia a atividade salva para o App.jsx
      onCreate(atividadeSalva);

      // Limpa o formulário
      setForm({
        type: "",
        distance: "",
        duration: "",
      });

    } catch (error) {
    console.error("ERRO COMPLETO:", error);
    console.error("Resposta do servidor:", error.response?.data);
    console.error("Status:", error.response?.status);
    console.error("Mensagem:", error.message);

    alert("Não foi possível criar a atividade. Veja o Console (F12).");
}
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
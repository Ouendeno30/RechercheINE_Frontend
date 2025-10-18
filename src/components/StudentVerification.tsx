import React, { useState } from "react";
import StudentCard from "./StudentCard";
import style from "./StudentVerification.module.css";

interface StudentData {
  name: string; // fullName dans l'API
  ine: string; // identifiantNationalEleve dans l'API
  program: string; // programme dans l'API
  institution: string; // institution dans l'API
  level: string; // niveau dans l'API
  validityPeriod?: string; // période de validité (ajouter si disponible)
}

const StudentVerification: React.FC = () => {
  const [ine, setIne] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateIne = (value: string): boolean => {
    return value.trim().length >= 5;
  };

  const handleSearch = async (): Promise<void> => {
    if (!validateIne(ine)) {
      setStudentData(null);
      setError("Veuillez fournir un INE valide !");
      return;
    }

    setLoading(true);
    setError(null);
    setStudentData(null);

    try {
      const response = await fetch(
        `https://api.parcoursupguinee.org/api/Student/GetStudentCardInfo/${ine}`
      );

      if (!response.ok) throw new Error("Erreur lors de la récupération");

      const data = await response.json();

      console.log("Réponse API complète:", data);

      // Mapping des données selon la structure effective reçue
      if (data && data.identifiantNationalEleve) {
        setStudentData({
          name: data.fullName || "N/A",
          ine: data.identifiantNationalEleve || ine,
          program: data.programme || "N/A",
          institution: data.institution || "N/A",
          level: data.niveau || "N/A",
          validityPeriod: data.validityPeriod || "N/A", // à ajouter si API le fournit
        });
        setError(null);
      } else {
        setStudentData(null);
        setError("Carte invalide");
      }
    } catch (e) {
      setStudentData(null);
      setError("Erreur lors de la récupération des données");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Vérification Carte Étudiant</h2>

      <label htmlFor="ineInput">Saisir INE :</label>
      <input
        id="ineInput"
        type="text"
        value={ine}
        onChange={(e) => setIne(e.target.value)}
        placeholder="Ex: ABCDE12345"
        style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 12 }}
        aria-required="true"
        aria-describedby="ineHelp"
      />
      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Vérifier
      </button>

      <div
        style={{ marginTop: 20, minHeight: 60, fontSize: 16 }}
        aria-live="polite"
        aria-atomic="true"
      >
        {loading && <p>⌛ Chargement...</p>}

        {!loading && error && (
          <p
            style={{
              color:
                error === "Veuillez fournir un INE valide !" ? "#555" : "red",
            }}
          >
            {error === "Veuillez fournir un INE valide !" ? "🔍" : "❌"} {error}
          </p>
        )}

        {!loading && studentData && (
          <>
            <p style={{ color: "green" }}>
              ✅ Carte valide - Période : {studentData.validityPeriod ?? "N/A"}
            </p>
            <StudentCard student={studentData} />
          </>
        )}
      </div>
    </div>
  );
};

export default StudentVerification;

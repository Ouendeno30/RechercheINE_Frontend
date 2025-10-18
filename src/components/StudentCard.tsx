import React from "react";

interface StudentCardProps {
  student: {
    name: string;
    ine: string;
    program: string;
    institution: string;
    level: string;
    validityPeriod?: string;
    annee: Date;
  };
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
      }}
      aria-label="Fiche étudiant"
    >
      <h3>Fiche Étudiant</h3>
      <p>
        <strong>Nom :</strong> {student.name}
      </p>
      <p>
        <strong>INE :</strong> {student.ine}
      </p>
      <p>
        <strong>Formation :</strong> {student.program}
      </p>
      <p>
        <strong>Établissement :</strong> {student.institution}
      </p>
      <p>
        <strong>Niveau :</strong> {student.level}
      </p>
      <p>
        <strong>Période de validité :</strong> {student.validityPeriod ?? "N/A"}
      </p>
    </div>
  );
};

export default StudentCard;

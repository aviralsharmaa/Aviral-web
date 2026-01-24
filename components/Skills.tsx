"use client";

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: 95 },
      { name: "R", level: 80 },
      { name: "SQL", level: 90 },
      { name: "JavaScript/TypeScript", level: 75 },
      { name: "C++", level: 70 },
    ],
  },
  {
    category: "ML/DL Frameworks",
    skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 95 },
      { name: "Scikit-learn", level: 95 },
      { name: "Keras", level: 90 },
      { name: "Hugging Face", level: 85 },
    ],
  },
  {
    category: "Tools & Technologies",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 75 },
      { name: "AWS/GCP", level: 80 },
      { name: "MLflow", level: 85 },
      { name: "Airflow", level: 75 },
      { name: "Git", level: 90 },
    ],
  },
  {
    category: "Data & Analytics",
    skills: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 95 },
      { name: "Apache Spark", level: 80 },
      { name: "Tableau", level: 70 },
      { name: "Jupyter", level: 95 },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Skills</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            A comprehensive toolkit for building and deploying machine learning solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="p-6 border border-white"
            >
              <h3 className="text-xl font-semibold mb-6 text-white">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-white/80">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/20 h-2">
                      <div
                        className="bg-white h-2"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


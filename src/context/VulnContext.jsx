import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

const VulnContext = createContext();
export const useVuln = () => useContext(VulnContext);



export function VulnProvider({ children }) {
  const [vulns, setVulns] = useState([
    {
      id: uuid(),
      nombre: 'SQL Injection',
      tipo: 'Inyección',
      riesgo: 'Alto',
      fecha: '2025-06-20',
      descripcion:
        'Entrada del usuario concatenada directamente en consultas SQL pudiendo revelar datos.',
      soluciones: ['Parámetros preparados', 'Validación de entrada'],
      gravedad: 'Crítico',
      categoria: 'OWASP A03',
      recomendaciones: 'Aplicar sentencias preparadas y ORM seguro.',
      evidencias: [],
      evidenciaPrincipal: null,
    },
  ]);

  const addVuln = (data) => setVulns([...vulns, { ...data, id: uuid() }]);
  const updateVuln = (id, data) =>
    setVulns(vulns.map((v) => (v.id === id ? { ...v, ...data } : v)));
  const deleteVuln = (id) => setVulns(vulns.filter((v) => v.id !== id));

  return (
    <VulnContext.Provider value={{ vulns, addVuln, updateVuln, deleteVuln }}>
      {children}
    </VulnContext.Provider>
  );
}

export default function Filters({ filtros, setFiltros }) {
  return (
    <div className="compact-filters">
      <select
        value={filtros.riesgo}
        onChange={(e) => setFiltros({ ...filtros, riesgo: e.target.value })}
        className="compact-input"
      >
        <option value="">Todos los riesgos</option>
        <option value="Alto">Alto</option>
        <option value="Medio">Medio</option>
        <option value="Bajo">Bajo</option>
      </select>

      <input
        type="date"
        value={filtros.fecha}
        onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
        className="compact-input"
      />

      <input
        type="text"
        placeholder="Tipo de vulnerabilidad"
        value={filtros.tipo}
        onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
        className="compact-input"
      />
    </div>
  );
}
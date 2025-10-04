import React, { useState, useEffect } from 'react';
import './App.css';


const BASE_URL = 'http://localhost:8091'; // 8091 es mi puerto que expongo en el application.properties de mi backend

 /* Aqui se usará un usuario en memoria con basic auth para que pueda acceder a los endpoints, ya cuando se requiera se puede implementar Jwt
 para traer usuarios de la BD*/
const AUTH_CREDENTIALS = 'admin:admin123';


interface Bus {
  id: number;
  numeroBus: string;
  placa: string;
  fechaCreacion: string;
  caracteristicas?: string;
  marcaNombre?: string;
  estado?: string;
}

function App() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  const authHeader = 'Basic ' + btoa(AUTH_CREDENTIALS);

  useEffect(() => {
    fetchPage(page, size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const fetchPage = (pageNumber: number = 0, pageSize: number = size) => {
    setLoading(true);
    setError(null);

    const url = `${BASE_URL}/bus?page=${pageNumber}&size=${pageSize}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': authHeader
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(data => {
        setBuses(Array.isArray(data.content) ? data.content : []);
        setTotalPages(data.totalPages ?? 0);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const prevPage = () => {
    if (page > 0) setPage(p => p - 1);
  };

  const nextPage = () => {
    if (page + 1 < totalPages) setPage(p => p + 1);
  };

  const showBusDetail = (bus: Bus) => {
    setSelectedBus(bus);
  };

  return (
    <div className="p-8 font-sans bg-civaLightGray min-h-screen">
      
      <h1 className="text-3xl font-extrabold mb-6 text-center text-civaPurple drop-shadow">
        Sistema de Buses — Listado
      </h1>

      <div className="mb-4 flex justify-end items-center">
        <label className="mr-2 font-medium text-gray-700">Tamaño página:</label>
        <select
          value={size}
          onChange={e => { setSize(Number(e.target.value)); setPage(0); }}
          className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-civaPurple"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-civaPurple"></div>
          <span className="ml-2 text-civaPurple font-medium">Cargando buses...</span>
        </div>
      )}
      {error && (
        <div className="bg-civaPink text-civaPurple p-3 rounded mb-4 border border-civaFuchsia">
          {error}
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto shadow-lg rounded-lg mb-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-civaPurple text-white">
            <tr>
              {['ID','Número','Placa','Fecha de Creación','Marca','Estado','Acciones'].map(title => (
                <th key={title} className="text-left px-6 py-3 border-b font-semibold">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buses.length === 0 && !loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No hay buses registrados
                </td>
              </tr>
            ) : (
              buses.map((bus, i) => (
                <tr key={bus.id} className={`transition-colors ${i%2===0?'bg-white':'bg-civaLightGray'} hover:bg-civaPink`}>
                  <td className="px-6 py-3 border-b">{bus.id}</td>
                  <td className="px-6 py-3 border-b">{bus.numeroBus}</td>
                  <td className="px-6 py-3 border-b">{bus.placa}</td>
                  <td className="px-6 py-3 border-b">{formatDate(bus.fechaCreacion)}</td>
                  <td className="px-6 py-3 border-b">{bus.marcaNombre ?? '-'}</td>
                  <td className="px-6 py-3 border-b">{bus.estado ?? '-'}</td>
                  <td className="px-6 py-3 border-b">
                    <button
                      onClick={() => showBusDetail(bus)}
                      className="bg-civaPurple text-white px-3 py-1 rounded hover:bg-civaFuchsia transition"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      <div className="flex justify-center items-center gap-4 mb-2">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className={`px-4 py-2 rounded transition ${page===0?'bg-gray-300 cursor-not-allowed':'bg-civaPurple text-white hover:bg-civaFuchsia'}`}
        >Anterior</button>
        <span className="font-medium text-gray-700">Página {page+1} {totalPages?`de ${totalPages}`:''}</span>
        <button
          onClick={nextPage}
          disabled={page+1>=totalPages}
          className={`px-4 py-2 rounded transition ${page+1>=totalPages?'bg-gray-300 cursor-not-allowed':'bg-civaPurple text-white hover:bg-civaFuchsia'}`}
        >Siguiente</button>
      </div>

      {/* Modal */}
      {selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedBus(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-civaPurple mb-4 border-b pb-2">
              Detalle del Bus
            </h2>

            <div className="text-gray-700 space-y-3">
              <div className="flex justify-between"><span className="font-medium">ID:</span><span>{selectedBus.id}</span></div>
              <div className="flex justify-between"><span className="font-medium">Número:</span><span>{selectedBus.numeroBus}</span></div>
              <div className="flex justify-between"><span className="font-medium">Placa:</span><span>{selectedBus.placa}</span></div>
              <div className="flex justify-between"><span className="font-medium">Fecha de creación:</span><span>{formatDate(selectedBus.fechaCreacion)}</span></div>
              <div className="flex justify-between"><span className="font-medium">Marca:</span><span>{selectedBus.marcaNombre ?? '-'}</span></div>
              <div className="flex justify-between"><span className="font-medium">Estado:</span><span>{selectedBus.estado ?? '-'}</span></div>
              <div className="flex flex-col"><span className="font-medium">Características:</span><span className="mt-1 break-words">{selectedBus.caracteristicas ?? '-'}</span></div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedBus(null)}
                className="bg-civaPurple hover:bg-civaFuchsia text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
              >Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-PE') + ' ' +
    d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

export default App;

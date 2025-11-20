import { useState, useEffect } from "react";
import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../helpers/theme";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Detecta automáticamente si es móvil
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Lista de temas (reusada en dropdown y en modal)
  const ThemeList = (
    <div className="flex flex-col gap-2">
      {THEMES.map((themeOption) => (
        <button
          key={themeOption.name}
          className={`
            w-full px-4 py-3 rounded-xl flex items-center gap-3
            text-left
            ${
              theme === themeOption.name
                ? "bg-primary/20 text-primary font-semibold"
                : "hover:bg-base-content/5"
            }
          `}
          onClick={() => {
            setTheme(themeOption.name);
            setModalOpen(false);
          }}
        >
          <PaletteIcon className="size-4 opacity-75" />

          <span className="text-sm font-medium">{themeOption.label}</span>

          <div className="ml-auto flex gap-1">
            {themeOption.colors.map((color, i) => (
              <span
                key={i}
                className="size-3 rounded-full border border-base-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* DESKTOP → dropdown */}
      {!isMobile && (
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost btn-circle min-h-10 min-w-10 flex items-center justify-center">
            <PaletteIcon 
              size={18}
              strokeWidth={2}
              className="text-primary opacity-80 hover:opacity-100 transition-all"
             />
          </button>

          <div
            tabIndex={0}
            className="
              dropdown-content mt-3 p-3 rounded-2xl shadow-xl
              bg-base-200 border border-base-content/10
              w-64 max-h-96 overflow-y-auto backdrop-blur-xl
            "
          >
            {ThemeList}
          </div>
        </div>
      )}

      {/* MOBILE → modal trigger */}
      {isMobile && (
        <li>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-ghost btn-circle min-h-10 min-w-10"
        >
          <PaletteIcon 
            size={18}
            strokeWidth={2}
            className="text-primary opacity-80 hover:opacity-100 transition-all"
          />
        </button>
        </li>
      )}

      {/* MODAL (solo móvil) */}
      {isMobile && modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-base-200 p-5 rounded-2xl">
            <h3 className="font-bold text-lg mb-4">Selecciona un tema</h3>

            <div className="max-h-80 overflow-y-auto">
              {ThemeList}
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setModalOpen(false)}>Cerrar</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default ThemeSelector;

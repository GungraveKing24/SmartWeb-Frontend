import { AppRouter } from "./router/AppRouter";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore()
  return (
    <div data-theme={theme}>
      <AppRouter />
    </div>
  );
}

export default App;

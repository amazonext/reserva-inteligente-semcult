import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // faz a janela a rolar para o topo sempre que a rota mudar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
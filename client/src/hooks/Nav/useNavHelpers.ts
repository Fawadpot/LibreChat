import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';

export function useCustomLink<T = HTMLAnchorElement>(route: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const clickHandler = useCallback(
    (event: React.MouseEvent<T>) => {
      if (event.button === 0 && !(event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        navigate(route, { state: { prevLocation: location } });
      }
    },
    [navigate, route, location],
  );
  return clickHandler;
}

export const usePreviousLocation = () => {
  const location = useLocation();
  const previousLocationRef: React.MutableRefObject<Location<unknown> | undefined> = useRef();

  useEffect(() => {
    previousLocationRef.current = location.state?.prevLocation;
  }, [location]);

  return previousLocationRef;
};

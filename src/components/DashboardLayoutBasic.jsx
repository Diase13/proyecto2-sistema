import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// Importa los componentes
import Home from '../pages/Home.tsx';
import Jugadoras from '../pages/Jugadoras.tsx'
import Entrenamiento from '../pages/Entrenamiento.tsx';
import Challenge from '../pages/Challenge.tsx';
import U10 from '../pages/plantilla/U10.tsx';
import U11 from '../pages/plantilla/U11.tsx';
import U12 from '../pages/plantilla/U12.tsx';
import U13 from '../pages/plantilla/U13.tsx';
import U15 from '../pages/plantilla/U15.tsx';
import U17 from '../pages/plantilla/U17.tsx';
import U19 from '../pages/plantilla/U19.tsx';
import Sensor from '../pages/Sensor.tsx';
//import Dashboard from './Dashboard';  // Importa tu componente Dashboard

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  // {
  //   segment: 'orders',
  //   title: 'Orders',
  //   icon: <ShoppingCartIcon />,
  // },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'plantillas',
    title: 'Plantilla',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'u10',
        title: 'U10',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'u11',
        title: 'U11',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'u12',
        title: 'U12',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'u13',
        title: 'U13',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'u15',
        title: 'U15',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'u17',
        title: 'U17',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'u19',
        title: 'U19',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'entrenamiento',
    title: 'Entrenamiento',
    icon: <LayersIcon />,
  },
  {
    segment: 'challenge',
    title: 'Challenge',
    icon: <LayersIcon />,
  },
  // {
  //   segment: 'jugadoras',
  //   title: 'Plantilla',
  //   icon: <LayersIcon />,
  // },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Componente que se mostrará cuando no haya una ruta válida (opcional)
function NotFound() {
  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography>Page not found</Typography>
    </Box>
  );
}

function DemoPageContent({ pathname }) {
  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const routes = {
    '/dashboard': <Home />, 
    '/jugadoras': <Jugadoras />, 
    '/entrenamiento': <Entrenamiento />,
    '/challenge': <Challenge navigate={router.navigate}/>,
    '/sensor': <Sensor />,
    '/plantillas/u10': <U10 />,
    '/plantillas/u11': <U11 />,
    '/plantillas/u12': <U12 />,
    '/plantillas/u13': <U13 />,
    '/plantillas/u15': <U15 />,
    '/plantillas/u17': <U17 />,
    '/plantillas/u19': <U19 />
  };

  // Si la ruta existe en el objeto `routes`, renderiza el componente, si no, renderiza una página NotFound
  const renderContent = routes[pathname] || <NotFound />;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {renderContent} {/* Aquí renderiza el componente dinámico */}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
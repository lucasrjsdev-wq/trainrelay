import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import PanelUsuariosLayer from "../components/PanelUsuariosLayer";

const PanelUsuariosPage = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Panel de Usuarios" />
      <PanelUsuariosLayer />
    </MasterLayout>
  );
};

export default PanelUsuariosPage;

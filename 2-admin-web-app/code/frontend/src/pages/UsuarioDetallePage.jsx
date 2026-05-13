import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UsuarioDetalleLayer from "../components/UsuarioDetalleLayer";

const UsuarioDetallePage = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Detalle de Usuario" />
      <UsuarioDetalleLayer />
    </MasterLayout>
  );
};

export default UsuarioDetallePage;

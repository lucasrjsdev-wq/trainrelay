import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashboardTrainRelayLayer from "../components/DashboardTrainRelayLayer";

const HomePageOne = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Dashboard" />
      <DashboardTrainRelayLayer />
    </MasterLayout>
  );
};

export default HomePageOne;

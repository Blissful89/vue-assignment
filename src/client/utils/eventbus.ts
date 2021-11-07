import mitt from 'mitt';

type Events = {
  message: Vehicles.Data;
};

export default mitt<Events>();

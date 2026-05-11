1- Un usuario administrador dueño tiene un panel de administración de usuarios (entrenadores y atletas). En dicho panel el administrador puede ver el estado de cada usuario.

2- Un usuario puede estar en los siguientes estados: 
2.1 Registrado (entrenadores y atletas que se crean un usuario desde la web).
2.2 Suscriptos (entrenadores y atletas que pagan por medio de una suscripción de mercadopago).
2.3 Activos (entrenadores y atletas que fueron aceptados por el administrador y tienen la suscripción paga).
2.4 Suspendidos (entrenadores y atletas que no tienen la suscripción paga).
2.5 Dueño (spolo root y nunca cambiará su estado).

3- El sistema debe chequear automáticamente si la suscipción esta paga y mantener los estados 2.3 y 2.4.

4- El sistema debe generar un reporte dashboard con cantidad de atletas y entrenadores registrados, con la distinción de su estado, además otras solapa con los ingresos mensualizados y anualizados. Los reportes se deben poder filtrar por entrenadores, atletas, estados de usuarios y rangos de fechas.

5- La aplicación de administración debe tener un acceso seguro con usuario y contraseña. Este usuario será el "root" y tendrá una contraseña "root" inicialmente. Deben quedar guardados en la base de datos en el esquema usuario, perfil, rol, permiso, contraseña. La contraseña debe quedar guardada encriptada. Inicialmente no vamos a filtrar por rol o permiso. Si el usuario y la contraseña coinciden con lo guardado en la base de datos, el usuario puede continuar.
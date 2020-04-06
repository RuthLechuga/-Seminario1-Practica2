# practica2_seminario1
# uSocial

## Descripción
Se desarrollará un aplicación web similar a Facebook o Twitter, esta permitirá compartir publicaciones los usuarios registrados. Tendrá las 
funcionalidades de login, registro de usuarios, ver publicaciones y crear publicaciones.

### Login
El usuario puede ingresar a la aplicación por medio de sus credenciales:
- **Nombre de usuario**
- **Contraseña**

### Registro
Para registrar un nuevo usuario obligatoriamente se pedirán los siguientes datos:
- **Nombre completo**
- **Usuario**
- **Contraseña**
- **Repetir contraseña**

## Página principal
###Publicaciones
En este apartado el usuario puede crear una publicación, el cual puede contener texto, imagen o ambas.

### Datos de Perfil
El usuario puede ver y modificar sus datos, en este caso serán:
- **Nombre completo**
- **Nombre de usuario**
- **Foto de perfil**
Tiene que ingresar la contraseña correcta para que se guarden los datos modificados

### VPC
Se creo una red virtual en la cual se configuro un internet gateway para que las subredes públicas puedan acceder y ser accedidas desde el internet. Se
configuro las route tables necesarias para la conexión de las subredes. La red es 10.0.0.0/16 y tiene como nombre VPC-G10.
Se crearán las subredes siguientes:

### Subred Sitio Web
Esta subnet es pública, en la cual pertenece la EC2 Sitio Web. El rango de IP’s es 10.0.1.0/24.

### Subred Servidor
Esta subred es privada , en la cual pertenece la EC2 Servidor. El rango de IP’s es 10.0.2.0/24.

### Subred Base de datos
Esta subred es privada , en la cual pertenece la EC2 base de datos. El rango de IP’s es 10.0.3.0/24.

### EC2
Se configuraron 3 EC2 para alojar los siguientes servicios, cada una pertenece a una subred descrita anteriormente.

### EC2 Sitio Web
Esta instancia contiene el sitio web (front-end) de la aplicación.

### EC2 Servidor
Esta instancia contiene el servidor al que se conectará el sitio web, y el cual tendrá acceso a un bucket de S3 para el almacenamiento de objetos (imágenes en este caso).

### EC2 Base de datos
Esta instancia almacena el servidor de base de datos, queda a discreción del estudiante que base de datos utilizar.

### S3
Se configuró un bucket de S3, para el almacenamiento de imágenes, tales como las de las publicaciones y las fotos de perfil de los usuarios.

## Sobre Amazon Web Service
Amazon Web Service es la empresa pionera en el paradigma “Infrastructure As A Service” por lo que dispone de una alta gama de servicios a precios bastante competentes para que cualquiera con conocimientos medios en programación sea capaz de levantar un data center en unos sencillos pasos.
A continuación, se detallan un poco mejor los servicios utilizados.

#### Amazon VPC
Amazon Virtual Private Cloud (Amazon VPC) permite aprovisionar una sección de la nube de AWS aislada de forma lógica, en la que puede lanzar recursos de AWS en una red virtual que usted defina.

#### Amazon S3
Amazon Simple Storage Service (Amazon S3) es un servicio de almacenamiento de objetos que ofrece escalabilidad, disponibilidad de datos, seguridad y rendimiento líderes en el sector. Esto significa que clientes de todos los tamaños y sectores pueden utilizarlo para almacenar y proteger cualquier cantidad de datos para diversos casos de uso, como sitios web, aplicaciones móviles, procesos de copia de seguridad y restauración, operaciones de archivado, aplicaciones empresariales, dispositivos IoT y análisis de big data

#### Amazon EC2
Amazon Elastic Compute Cloud (Amazon EC2) es un servicio web que proporciona capacidad informática en la nube segura y de tamaño modificable. Está diseñado para simplificar el uso de la informática en la nube a escala web para los desarrolladores.

#### WS Identity and Access Management (IAM)
Con AWS Identity and Access Management (IAM) puede administrar el acceso a los servicios y recursos de AWS de manera segura. Además, puede crear y administrar usuarios y grupos de AWS, así como utilizar permisos para conceder o negar el acceso de estos a los recursos de AWS.

##### IAM Usuarios Implementados
**Administrador_201503984**: Usuario creado para trabajar en la práctica, usando la política de administrador que proporciona aws.
**Administrador_201602975**: Usuario creado para trabajar en la práctica, usando la política de administrador que proporciona aws.

## Autores
#### **201503984** Fernando Vidal Ruíz Piox
#### **201602975** Ruth Nohemy Ardón Lechuga
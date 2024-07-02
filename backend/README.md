# Codo a Codo Shop

## Base de datos
Los scripts para la creación de la base de datos se encuentran dentro de la carpeta ```backend/scripts_db```

## Armar el archivo de configuración
Realizar una copia del archivo ```config.example.py``` y renombrarlo como  ```config.py```
Completar con la configuracion para la base de datos 

## Pasos para armar el backend
- (Linux) Crear entorno virtual en directorio ```backend```:
```
python3 -m venv env
```
- (Linux) Activar entorno virtual:
```
source env/bin/activate
```
- (Linux) Instalar dependencias con pip:
```
python3 -m pip install -r requirements.txt
```
- (Linux) Ejecutar la aplicación:
```
python3 src/app.py
```
- (Windows) Crear entorno virtual en directorio backend:
```
python.exe -m venv env
- (Windows) Activar entorno virtual:
```
.\env\Scripts\activate
```
- (Windows) Instalar dependencias con pip:
```
python.exe -m pip install -r requirements.txt
```
- (Windows) Ejecutar la aplicación:
```
python.exe .\src\app.py
```
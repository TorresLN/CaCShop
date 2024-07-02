class DevelopmentConfig():
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = '' #Nombre de usuario de la base de datos
    MYSQL_PASSWORD = '' #Contraseña del usuario de base de datos
    MYSQL_DB = 'cac_shop_db' #Nombre de la base de datos

config = {
    'development' : DevelopmentConfig
}
export class ErrorHandler {

    static map: { [key: string]: string; } = {
        'Attempt limit exceeded, please try after some time.':'Intentos máximos excedidos.Prueba de nuevo en un rato.',
        'Incorrect username or password.':'Tu usuario o tu contraseña son incorrectos.Inténtalo nuevamente.',
        'User does not exist.':'Usuario no registrado',
        'Network Failure':'Falla en la conexión a Internet',
        'Username/client id combination not found.':'Tu usuario o tu contraseña no coinciden con nuestro registro.',
        'Invalid verification code provided, please try again.':'Código de verificación inválido.',
        'PostConfirmation failed with error co.citywallet.exception.CityWalletException.':'Error al crear cuenta.',
        'User is already confirmed.':'Este usuario ya fue validado.',
        'User cannot confirm because user status is not UNCONFIRMED.':'Usuario no registrado',
        'Cannot reset password for the user as there is no registered/verified email or phone_number':'Usuario no registrado',
        'User is not confirmed.':'Este usuario no ha sido validado.',
        'User already exists':'El nombre de usuario ya existe',
        'Password reset required for the user':'Por favor reestablezca la contraseña',
        'An account with the email already exists.':'Este correo electrónico ya se encuentra registrado',
        1: 'Uno o más campos están vacíos.Inténtalo nuevamente.',
        2: 'Uno o más datos son inválidos.Inténtalo nuevamente.',
        10:'Url de imagen o descripción inválida',
        31:'Estos campos no se pueden editar',
        40:'Esta calcomanía no existe.',
        41:'Esta calcomania ya pertenece a otro usuario.',
        42:'El código PIN o el código PAK son inválidos.Inténtalo nuevamente.',
        43:'PIN o PAK faltante. Inténtalo nuevamente.',
        44:'PIN o PAK inválido.Inténtalo nuevamente.',
        45:'PIN o PAK inválido.Inténtalo nuevamente.',
        60:'Ocurrio un error al realizar la transacción.Inténtalo nuevamente.',
        61:'No se encuentran todos los datos para concluir la transacción',
        62:'Ocurrio un error al realizar la transacción.Inténtalo nuevamente.',
        63:'Uno o más campos están vacíos.Inténtalo nuevamente.',
        70:'Ya posees llave de pago',
        71:'Llave de pago inválida. Inténtelo nuevamente.',
        72:'Llave de pago no detectada.Inténtelo nuevamente.',
        73:'No existe llave de pago para esta cuenta',
        74:'Respuesta incorrecta',
        81:'Uno o más campos están vacíos.Inténtalo nuevamente.',
        82:'Uno o más datos son inválidos.Inténtalo nuevamente.',
        83:'El número de deposito ya ha sido registrado con anterioridad',
        91:'Uno o más datos son inválidos.Inténtalo nuevamente.',
        92:'Uno o más campos están vacíos.Inténtalo nuevamente.',
        100:'Cuenta Inválida',
        104:'Tu pago ha sido rechazado por el banco',
        105:'Error al realizar el pago',
        106:'Datos de pago inválidos ',
        107: 'Error al conectar con el banco',
        120:'No existe llave de pago para esta cuenta',
        130:'Uno o más campos están vacíos.Inténtalo nuevamente.',
        131:'Uno o más datos son inválidos.Inténtalo nuevamente.',
        132:'No hay productos disponibles.',
        133:'No hay ordenes generadas.',
        134:'Este producto no tiene inventario suficiente.Prueba con otra cantidad',
        200:'Aún no tienes mensajes en tu buzón.',
        //INPUTS MESSAGE
        500: 'El campo es requerido',
        501: 'El campo posee un carácter inválido',
        502: 'El campo posee un formato inválido',
        503: 'El campo requiere una longitud minima de 3 caracteres',
        504: 'El campo excede la longitud maxima',
        505: 'El campo posee una logitud inválida',
        506: 'El monto mínimo no ha sido alcanzado',
        507: 'El monto mínimo de recarga es Bs.F.',
        508: 'El monto máximo de recarga es Bs.F.',
        509: 'El número de tarjeta de la crédito es inválida',
        //ERROR
        600:'El monto supera al disponible',
        601:'La confirmación de tu llave de pago no coincide',
        602:'Llave de pago inválida.Inténtelo nuevamente.',
        603:'No puedes seleccionar tu mismo usuario',
        //SUCCESS
        700:'Tu pago ha sido aprobado',
        701:'Tu pago ha sido recibido.Será abonado a tu cuenta en un periodo de 24h',
        702:'La llave de pago se ha configurado de forma correcta',
        703:'La llave de pago se ha reestablecido de forma correcta',
        704:'El envío de dinero se realizó de forma exitosa. Número de referencia:',
        705:'Su alias se ha registrado exitosamente',
        706:'Su contraseña ha sido actualizada satisfactoriamente',
        707: 'Calcomanía agregada con éxito',
        708: 'Los lectores no pueden procesarla mientras esté desactivada',
        709:'La petición de dinero se realizó de forma exitosa.',
        710: 'Los lectores no pueden procesarla mientras esté desactivada',
        //GENERAL
        800:'Tu dispositivo no posee conexión a internet. La Transacción se realizará por SMS',
        801:'Tu transacción fue recibida, podrás ver su estatus en tu balance.',
        802:'Hemos recibido tu solicitud de retiro de dinero.Será abonado a tu cuenta en un periodo de 48h',
        803:'Tu cuenta ha sido validada correctamente',
        804:'Tu contraseña se reestableció correctamente',
        999:'Lo sentimos, tenemos un error interno.',
        undefined:'Ocurrido un error inesperado.',
        default:'Ocurrido un error inesperado.'
    };


    constructor() {

    }

    public static getMessage(code: string) {
        var msg = ErrorHandler.map[code];
        if (msg == null) {
            //msg = 'Se ha detectado un error interno';
            msg=code;
        }


        return msg;
    }

}
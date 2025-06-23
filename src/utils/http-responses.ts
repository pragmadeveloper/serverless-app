export const ResponseCode = {
  _200_OPERATION_SUCCESSFUL: 200,
  _400_BAD_REQUEST: 400,
  _404_NOT_FOUND: 404,
  _422_PROCESS_ERROR: 422,
  _500_UNCONTROLLER_ERROR: 500,
  _503_SERVICE_UNAVAILABLE: 503,
};

export const ResponseCodeCodes = {
  _OPERATION_SUCCESSFUL: "OPERATION_SUCCESSFUL",
  _BAD_REQUEST: "BODY_INVALID",
  _NOT_FOUND: "DATA_NOT_FOUND",
  _PROCESS_ERROR: "PROCESS_ERROR",
  _UNCONTROLLER_ERROR: "UNCONTROLLER_ERROR",
  _SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE"
};

export const httpResponses = {
  _200_OK: (data?: any) => {
    return {
      statusCode: ResponseCode._200_OPERATION_SUCCESSFUL,
      code: ResponseCodeCodes._OPERATION_SUCCESSFUL, 
      message: "Operación exitosa.", 
      data: data ?? {} 
    };
  },
  _400_BAD_REQUEST: (param?: string, message?: string) => {
    return {
      statusCode: ResponseCode._400_BAD_REQUEST,
      code: ResponseCodeCodes._BAD_REQUEST,
      param: param ?? null,
      message: message ?? "Datos invalidos."
    };
  },
  _404_NOT_FOUND: (param?: string, message?: string) => {
    return {
      statusCode: ResponseCode._404_NOT_FOUND,
      code: ResponseCodeCodes._NOT_FOUND,
      param: param ?? null,
      message: message ?? "No encontrado."
    };
  },
  _422_PROCESS_ERROR: (param?: string, message?: string) => {
    return {
      statusCode: ResponseCode._422_PROCESS_ERROR,
      code: ResponseCodeCodes._PROCESS_ERROR,
      param: param ?? null,
      message: message ?? "Error de procesamiento"
    };
  },
  _500_UNCONTROLLER_ERROR: (message?: string) => {
    return {
      statusCode: ResponseCode._500_UNCONTROLLER_ERROR,
      code: ResponseCodeCodes._UNCONTROLLER_ERROR,
      param: null,
      message: message || "Error no controlado"
    };
  },
  _503_SERVICE_UNAVAILABLE: (message?: string) => {
    return {
      statusCode: ResponseCode._503_SERVICE_UNAVAILABLE,
      code: ResponseCodeCodes._SERVICE_UNAVAILABLE,
      param: null,
      message: message ?? "Servicio no disponible"
    };
  }
};

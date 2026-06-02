class ApiResponse {
  static ok(message: string, data?: unknown) {
    return Response.json(
      {
        success: true,
        code: "OK",
        status: 200,
        message,
        data,
      },
      { status: 200 },
    );
  }

  static created(message: string, data?: unknown) {
    return Response.json(
      {
        success: true,
        code: "CREATED",
        status: 201,
        message,
        data,
      },
      { status: 201 },
    );
  }

  static html(html: string, type: "success" | "error" = "success") {
    return new Response(html, {
      status: type === "error" ? 400 : 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}

export default ApiResponse;

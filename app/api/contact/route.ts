import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }

    // Get Resend API key from environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    // Resend free tier only allows sending to the account owner's email
    // Use the account owner's email (tommibenavidesc@gmail.com) or set CONTACT_EMAIL env var
    const recipientEmail = process.env.CONTACT_EMAIL || 'tommibenavidesc@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return NextResponse.json(
        { 
          error: 'Configuración del servidor incompleta. Por favor, contacta al administrador.' 
        },
        { status: 500 }
      );
    }

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${fromEmail}>`,
        to: [recipientEmail],
        subject: `📧 Nuevo mensaje de contacto - ${name}`,
        text: `Nuevo mensaje de contacto

Has recibido un nuevo mensaje a través del formulario de contacto de tu portfolio.

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

---
Este mensaje fue enviado desde el formulario de contacto del portfolio.
Fecha: ${new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-collapse: collapse;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 30px 30px 20px 30px; background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                          Nuevo mensaje de contacto
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 30px;">
                        <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                          Has recibido un nuevo mensaje a través del formulario de contacto de tu portfolio.
                        </p>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 25px 0;">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #9333ea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <span style="color: #111827; font-size: 16px;">${name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #9333ea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <a href="mailto:${email}" style="color: #9333ea; text-decoration: none; font-size: 16px;">${email}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <div style="margin-top: 30px;">
                          <strong style="color: #9333ea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">Mensaje:</strong>
                          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #9333ea; color: #111827; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${message.replace(/\n/g, '<br>')}
                          </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                          <a href="mailto:${email}?subject=Re: Nuevo mensaje de contacto" style="display: inline-block; background-color: #9333ea; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px;">
                            Responder
                          </a>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                          Este mensaje fue enviado desde el formulario de contacto del portfolio.<br>
                          <span style="color: #9ca3af;">Fecha: ${new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</span>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      
      // Provide more specific error messages
      if (errorData.statusCode === 403) {
        return NextResponse.json(
          { 
            error: 'Error de configuración: El dominio de envío no está verificado. Por favor, verifica tu dominio en Resend o contacta al administrador.' 
          },
          { status: 403 }
        );
      }
      
      if (errorData.message) {
        return NextResponse.json(
          { 
            error: `Error al enviar el email: ${errorData.message}` 
          },
          { status: resendResponse.status }
        );
      }
      
      throw new Error('Failed to send email via Resend');
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully:', resendData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado con éxito' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Ha ocurrido un error al enviar el mensaje. Por favor, intenta nuevamente.' 
      },
      { status: 500 }
    );
  }
}


Portafolio personal de Tomasin

## Configuración del Formulario de Contacto

El formulario de contacto utiliza Resend para enviar emails. Para configurarlo:

1. Crea una cuenta en [Resend](https://resend.com) (tiene un plan gratuito)
2. Obtén tu API key desde [Resend API Keys](https://resend.com/api-keys)
3. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Resend API Configuration
RESEND_API_KEY=re_tu_api_key_aqui

# Email Configuration
# El email donde recibirás los mensajes del formulario
CONTACT_EMAIL=thriftytomas@gmail.com

# El email que aparecerá como remitente
# Nota: Debe ser un dominio verificado en Resend, o usa onboarding@resend.dev para pruebas
FROM_EMAIL=onboarding@resend.dev
```

4. Reinicia el servidor de desarrollo después de agregar las variables de entorno

### Nota sobre FROM_EMAIL

- Para producción, necesitas verificar un dominio en Resend
- Para desarrollo/pruebas, puedes usar `onboarding@resend.dev` (solo funciona para emails a tu propia cuenta)
- Una vez verificado tu dominio, cambia `FROM_EMAIL` a algo como `noreply@tudominio.com`
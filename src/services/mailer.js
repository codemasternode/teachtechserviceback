import { sendMail } from "../config/nodemailer";

export function sendConfirmationEmail({ email, first_name, last_name, url }) {
  console.log(email, first_name, last_name, url);
  let template = `<!DOCTYPE html>
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
        .ReadMsgBody {
          width: 100%;
        }
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass * {
          line-height: 100%;
        }
        .active-button {
          margin-top: 1rem;
          max-width: 200px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          padding: 0.5rem 1rem;
          font-size: 24px;
          color: white;
          font-weight: 600;
          background: #0a2957;
          text-decoration: none;
          text-align: center;
          box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.7);
        }
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">
        @media only screen and (max-width: 480px) {
          @-ms-viewport {
            width: 320px;
          }
          @viewport {
            width: 320px;
          }
        }
      </style>
      <!--<![endif]-->
      <!--[if mso
        ]><xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG /> <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings></xml
        ><!
      [endif]-->
      <!--[if lte mso 11
        ]><style type="text/css">
          .outlook-group-fix {
            width: 100% !important;
          }
        </style><!
      [endif]-->
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
        rel="stylesheet"
        type="text/css"
      />
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Roboto);
        @import url(
          https://fonts.googleapis.com/css?family=Ubuntu:300,
          400,
          500,
          700
        );
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width: 480px) {
          .mj-column-per-100 {
            width: 100% !important;
          }
        }
      </style>
    </head>
    <body style="background: #FFFFFF;">
      <div class="mj-container" style="background-color:#FFFFFF;">
        <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
        <div style="margin:0px auto;max-width:600px;">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            style="font-size:0px;width:100%;"
            align="center"
            border="0"
          >
            <tbody>
              <tr>
                <td
                  style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;"
                >
                  <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
                  <div
                    class="mj-column-per-100 outlook-group-fix"
                    style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"
                  >
                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      style="vertical-align:top;"
                      width="100%"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="word-wrap:break-word;font-size:0px;padding:15px 15px 15px 15px;"
                            align="center"
                          >
                            <div
                              style="cursor:auto;color:#ffc107;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;"
                            >
                              <p>
                                <span style="font-size:18px;"
                                  ><strong>Teach Tech Se</strong></span
                                ><span style="font-size:18px;"
                                  ><strong>rvice</strong></span
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="word-wrap:break-word;font-size:0px;padding:15px 15px 15px 15px;"
                            align="center"
                          >
                            <div
                              style="cursor:auto;color:#000000;font-family:Roboto, Tahoma, sans-serif;font-size:11px;line-height:1.5;text-align:center;"
                            >
                              <p>
                                <span style="font-size:28px;"
                                  >Witaj ${first_name} ${last_name}</span
                                >
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="word-wrap:break-word;font-size:0px;">
                            <div
                              style="font-size:1px;line-height:10px;white-space:nowrap;"
                            >
                              &#xA0;
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="word-wrap:break-word;font-size:0px;padding:15px 15px 15px 15px;"
                            align="left"
                          >
                            <div
                              style="cursor:auto;color:#000000;font-family:Roboto, Tahoma, sans-serif;font-size:11px;line-height:1.5;text-align:left;"
                            >
                              <h2 style="line-height: 100%;text-align: center;">
                                Aby aktywowa&#x107; konto naci&#x15B;nij:
                              </h2>
                            </div>
                            <a
                              href="${url}"
                              target="_blank"
                              class="active-button"
                            >
                              Aktywuj
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
      </div>
    </body>
  </html>
  `;
  sendMail(
    email,
    `Teach Tech Service - potwierdź email ${first_name}`,
    template
  );
}

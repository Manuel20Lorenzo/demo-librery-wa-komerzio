// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpService } from '@nestjs/axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class templateServiceWA {
  constructor(private httpService: HttpService) {}
  sendTemplateComponentsVariable(
    config: any,
    contact: string,
    _components: any,
  ) {
    console.log('_components:', _components[0].parameters);
    console.log('_config:', config);
    /* try { */
      /* return this.httpService.post<any>(
        /* 100350656068712 
        'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',
        {
          messaging_product: 'whatsapp',
          to: contact,
          type: 'template',
          template: {
            name: config.nameTemplate,
            language: {
              code: config.codeLenguaje,
            },
            components:_components,
          },
        },
        {
          headers: {
            Authorization: 'Bearer '+config.token,
          },
        },
      )  */
      return this.httpService.post<any>(
        'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',
        {
          messaging_product: 'whatsapp',
          to: contact,
          type: 'template',
          template: {
            name: config.nameTemplate/* 'komerzio_nomina' */,
            language: {
              code: config.codeLenguaje /* 'es_ES' */,
            },
            components:_components,
          },
        },
        {
          headers: {
            Authorization: 'Bearer '+config.token,
          },
        }
      ).subscribe(
        (res)=>{
          console.log('Esto es un res: ',res)
          return res
        },(err)=>{
          console.log('Esto es un err: ',err.response.data.error)
          return err.response.data.error
        }

      ) 
    /* } catch (error) {
      console.log('error sendTemplateComponentsVariable: ',error)
    } */
    
  }

  sendTemplateComponentsNull(config: any, contact: string) {
    console.log('config.token:', config.token);
    this.httpService.post(
      /* 100350656068712 */
      'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',
      {
        messaging_product: 'whatsapp',
        to: contact,
        type: 'template',
        template: {
          name: config.nameTemplate /* 'komerzio_nomina' */,
          language: {
            code: config.codeLenguaje /* 'es_ES' */,
          },
        },
      },
      {
        headers: {
          Authorization: 'Bearer ' + config.token,
        },
      },
    )
  }
}

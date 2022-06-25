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
          /* EAAT4HsP2hXIBAFaCUDaPbgOEYCcVXyH5ZB5INIGyanLTOj5IhKCZCTPsvqZBLMdSPzZA3BukQySmOkzhmeKK6WvThUFyG2ZCZBZCZBXOclR2TMoEe9ZBATiz4PV2gE2AsSLgH0AmlLzjYNL6NADkJVDKBQMoIh3QOMoCiY64HlZCwuIVLb0i0T3RPnNAkKw5wlZAAYAPAPwgOXU0QZDZD 
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
          /* EAAT4HsP2hXIBAFaCUDaPbgOEYCcVXyH5ZB5INIGyanLTOj5IhKCZCTPsvqZBLMdSPzZA3BukQySmOkzhmeKK6WvThUFyG2ZCZBZCZBXOclR2TMoEe9ZBATiz4PV2gE2AsSLgH0AmlLzjYNL6NADkJVDKBQMoIh3QOMoCiY64HlZCwuIVLb0i0T3RPnNAkKw5wlZAAYAPAPwgOXU0QZDZD */
          headers: {
            Authorization: 'Bearer EAAT4HsP2hXIBAAwdDV0IwRbmyDkw5wZAjP0DJ4uAncRTKWD96oXxBc4vXUHaEjutZBZAEa70taWyPoetO2dl1fMMy7rGlALCR1ZCdoFYPSasxVIkZCpbHik19lis4gfMHnxInl4eyfNxoTZC2bAzgSIQPnCfuFcFkhgAm0TQ1ZAZAHYHM19qd70co63c1hVgenuZBulqhKu8BswZDZD',
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
        /* EAAT4HsP2hXIBAFaCUDaPbgOEYCcVXyH5ZB5INIGyanLTOj5IhKCZCTPsvqZBLMdSPzZA3BukQySmOkzhmeKK6WvThUFyG2ZCZBZCZBXOclR2TMoEe9ZBATiz4PV2gE2AsSLgH0AmlLzjYNL6NADkJVDKBQMoIh3QOMoCiY64HlZCwuIVLb0i0T3RPnNAkKw5wlZAAYAPAPwgOXU0QZDZD */
        headers: {
          Authorization: 'Bearer ' + config.token,
        },
      },
    )
  }
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CloudWaKomerzioService {
  constructor(
    private httpService: HttpService
  ) {}
  components: Array<{
    type: string;
    parameters: Array<{
      type: string;
      text?: string;
      image?: Object;
    }>;
  }>;
  sendMsgTemplate(
    _config: {
      idBussiness: string;
      nameTemplate: string;
      codeLenguaje: string;
      token: string;
    },
    _contact,

    _body?: {
      type: 'body';
      parameters: Array<{
        type: string;
        text: string;
      }>;
    },
    _header?: {
      type: string;
      parameters: Array<{
        type: string;
        image: {
          link: string;
        };
      }>;
    },
  ): any {
    console.log('_header.parameters.length: ', _header.parameters.length);
    if (_body !== null || _header !== null) {
      if (_body !== null && _header === null) {
        /* ESTO QUIERE DECIR QUE SOLO MANEJA VARIABLE EN EL BODY DEL TEMPLATE */
        return this.sendTemplateComponentsVariable(
          _config,
          _contact,
          [_body],
        );
      } else if (_body === null && _header !== null) {
        console.log('_header:', [_header]);
        /* ESTO QUIERE DECIR QUE SOLO MANEJA VARIABLE EN EL HEADER DEL TEMPLATE */
        return this.sendTemplateComponentsVariable(
          _config,
          _contact,
          [_header],
        );
      } else if (_body !== null && _header !== null) {
        /* ESTO QUIERE DECIR QUE SOLO MANEJA VARIABLE EN EL HEADER Y BODY DEL TEMPLATE */
        return this.sendTemplateComponentsVariable(
          _config,
          _contact,
          [_header, _body],
        );
      }
    } else {
      return this.sendTemplateComponentsNull(
        _config,
        _contact,
      );
    }
  }

  sendSimpleMsg(
    config: {
      idBussiness: string;
      token: string;
    },
    _contact: string,
    _body: {
      type: string;
      text?: {
        preview_url: boolean;
        body: string;
      };
    },
  ) {
  }

  private sendTemplateComponentsVariable(config,contact,_components){
    this.httpService.post<any>(
      'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',
      {
        messaging_product: 'whatsapp',
        to: contact,
        type: 'template',
        template: {
          name: config.nameTemplate/* 'komerzio_nomina' */ ,
          language: {
            code: config.codeLenguaje /* 'es_ES' */,
          },
          components: _components,
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
        return res.status;
      },(err)=>{
        console.log('Esto es un err: ',err.response.data.error)
        return err.response.data.error;
      }

    )
  }

  private sendTemplateComponentsNull(config,contact){
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
    ).subscribe(
      (res)=>{
        console.log('Esto es un res: ',res)
        return res.status;
      },(err)=>{
        console.log('Esto es un err: ',err.response.data.error)
        return err.response.data.error;
      }

    )
  }

  sendMsg(config:{
    idBussiness:string,
    token:string
  },_contact:string,_type:string,_body:{
    text?:{
      preview_url:string,
      body:string
    },
    image?:{
      link:string
    }
    interactive?:{
      type:string,
      action:{
        button:string,
        sections?:Array<{
          title:string,
          row:Array<{  
            id:string,
            title:string,
            description:string  
          }>
        }>
        buttons?:Array<{
          type: string,
          reply: {
          id: string,
          title: string,
          }
        }>
      },body:{
        text?: string,
      },header?:{
        type: string,
        text: string,
      },footer?: {
        text: string
      },
    }
  }): Promise<any> {
    console.log('data: ',config,_contact,_body)
    if(_type === 'text'){
      return Promise.resolve(
        this.sendText(config,_contact,_body).then(
          (res)=>{
          console.log('res sendText',res);
          return res;
        }).catch(
          (err)=>{
            console.log(err)
            return err;
          }
        )
      )
    }else if(_type === 'image'){
      return Promise.resolve(
        this.sendImage(config,_contact,_type,_body).then(
          (res)=>{
          console.log('res sendText',res);
          return res;
        }).catch(
          (err)=>{
            console.log(err)
            return err;
          }
        )
      );
    } else if(_type === 'interactive'){
      console.log('interactive')
      return Promise.resolve(
        this.sendInteractiveMessages(config,_contact,_type,_body.interactive).then(
          (res)=>{
          console.log('res sendText',res);
          return res;
        }).catch(
          (err)=>{
            console.log(err)
            return err;
          }
        )
      )
    }
  }

  getAllTemplateMetaWA(config:{
    idBussiness:string,
    token:string
  }){
    return this.httpService.get('https://graph.facebook.com/v14.0/'+config.idBussiness+'/message_templates',
    {
      headers: {
        Authorization: 'Bearer ' + config.token,
      },
    })
    .toPromise()
    .then(
      (res)=>{
        return res.data
      }
    ).catch(
      (err)=>{
        return err.response.data.error;
      }
    )
  }
  getFilterNameTemplate(config:{
    idBussiness:string,
    token:string,
    messageTemplateNamespace:string
  }){
    /* https://graph.facebook.com/v14.0/{whatsapp-business-account-ID}
      ?fields=message_template_namespace
      &access_token={system-user-access-token} */
      return this.httpService.get(
        'https://graph.facebook.com/v14.0/'+config.idBussiness+'?fields='+config.messageTemplateNamespace,
        {
          headers: {
            Authorization: 'Bearer ' + config.token,
          },
        }/* +'&access_token='+config.token */
      )
      .toPromise()
      .then(
        (res)=>{
          return res.data
        }
      ).catch(
        (err)=>{
          return err.response.data.error;
        }
      )
  }

  /* FUNCIONES SECUNDARIA... */
  private sendText(config,_contact,_body): Promise<any>{
    console.log('data: ',config,_contact,_body)
    return this.httpService.post(
      /* 100350656068712 */
      'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',{
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: _contact,
        type: "text",
        text:_body.text,
      },{
        headers: {
          Authorization: 'Bearer ' + config.token,
        },
      },
    ).toPromise().then((res:any) =>{ 
      console.log(res.data)
      return res.data;
    })
    .catch((err)=>{
      console.log(err.data)
      return err.response.data.error;
    });
  }

  private sendImage(config,_contact,_type,_body): Promise<any>{
    console.log('data: ',config,_contact,_body)
    return this.httpService.post(
      /* 100350656068712 */
      'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',{
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: _contact,
        type: _type,
        image:_body.text,
      },{
        headers: {
          Authorization: 'Bearer ' + config.token,
        },
      },
    ).toPromise().then((res:any) =>{ 
      console.log(res.data)
      return res.data;
    })
    .catch((err)=>{
      console.log(err.data)
      return err.response.data.error;
    });
  }

  private sendInteractiveMessages(config,_contact,_type,interactive:{
    type:string,
    action:{
      button:string,
      
      sections?:Array<{
        title:string,
        row:Array<{  
          id:string,
          title:string,
          description:string  
        }>
      }>
    }
    header?:{
      type: string,
      text?: string,
    },
    body?:{
      text?: string,
    },footer?: {
      text: string
    },
  }): Promise<any>{
    return this.httpService.post(
      /* 100350656068712 */
      'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',{
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: _contact,
        type: 'interactive',
        interactive:interactive,
      },{
        headers: {
          Authorization: 'Bearer ' + config.token,
        },
      },
    ).toPromise().then((res:any) =>{ 
      console.log(res.data)
      return res.data;
    })
    .catch((err)=>{
      console.log(err.data)
      return err.response.data.error;
    });
  }

}

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Res,
  Req,
  /* HttpCode, */
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CloudWaKomerzioService } from '../libs/cloud-wa-komerzio/src/cloud-wa-komerzio.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private cloudKomerzio: CloudWaKomerzioService,
    private httpService: HttpService
  ) {}

  /* @Get('1')
  getHello(): string {
    return this.appService.getHello();
  } */

  @Post('envioTemplate')
  getEnvioMsj(@Res() res, @Req() req, @Body() data: any) {
    const dataPush = [];
    console.log('Entre aca');
    try {
      data._dta.forEach((_bodyDto:any) => {
        console.log(_bodyDto)
        let returnDTO = this.cloudKomerzio.sendMsgTemplate(data.config,_bodyDto.contact,_bodyDto._body,_bodyDto._header)
        console.log('returnDTO: ',returnDTO)
      });
      console.log('_header: ',data._dta[0]._header)
      /* this.httpService.post<any>(
        'https://graph.facebook.com/v13.0/' + data.config.idBussiness + '/messages',
        {
          messaging_product: 'whatsapp',
          to: data._dta[0].contact,
          type: 'template',
          template: {
            name: data.config.nameTemplate/* 'komerzio_nomina'  ,
            language: {
              code: data.config.codeLenguaje /* 'es_ES' ,
            },
            components:[data._dta[0]._header],
          },
        },
        {
          headers: {
            Authorization: 'Bearer TOKEN',
          },
        }
      ).subscribe(
        (res)=>{
          console.log('Esto es un res: ',res)
        },(err)=>{
          console.log('Esto es un err: ',err.response.data.error)
        }

      ) */
      return res.status(HttpStatus.OK).send({
        msg: 'Pa ve qlq getEnvioMsj',
        dataPush,
      });
    } catch (error) {
      console.log({error: error})
      return res.status(HttpStatus.CONFLICT).send({
        msg: 'Error getEnvioMsj',
        error,
      });
    }
  }

  @Post('envioMsg')
  reciboMsg(@Res() res, @Body() data:any) {
    /*  
    {
        "config":{
            "idBussiness": "105513325503375",
            "token": "TOKEN"
        },
        "contact":"584241599592",
        "type": "image",
        "_body":{
            "text": {
                "link": "https://files.slack.com/files-pri/T03AQ1CFUSC-F03LZC5F08Z/kenz_____1.jpg"
            }
        }

    }
    */
    console.log(data)
    this.cloudKomerzio.sendMsg(data.config,data.contact,data.type,data._body).then(
      (dto)=>{
        console.log('Llego la promesa al controlador:',dto)
        return res.status(HttpStatus.OK).send(dto);
      }
    ).catch(
      (err)=>{
        console.log('Llego la promesa al controlador:',err)
        return res.status(HttpStatus.OK).send(err);
      }
    )
  }

  @Post('sendInteractiveMessagesSection')
  sendInteractiveMessagesSection(@Res() res, @Body() data:any){
    /* 
      "_body":{
        "interactive":{
            "type": "list",
            "header": {
            "type": "text",
            "text": "Prueba pa que Alberto le de algo..."
            },
            "body": {
            "text": "Bro, te va a dat un orgasmo con esto pero calma aqui estoy construyendo la libreria poco a poco jajaj..!! Sorry por joder hoy a esta hora jajaj.., me avisas cuando te llegue.. "
            },
            "footer": {
            "text": "Esto a sido una aventura.."
            },
            "action": {
                "button": "BUTTON_TEXT",
                "sections": [
                    {
                    "title": "SECTION_1_TITLE",
                    "rows": [
                        {
                        "id": "SECTION_1_ROW_1_ID",
                        "title": "SECTION_1_ROW_1_TITLE",
                        "description": "SECTION_1_ROW_1_DESCRIPTION"
                        },
                        {
                        "id": "SECTION_1_ROW_2_ID",
                        "title": "SECTION_1_ROW_2_TITLE",
                        "description": "SECTION_1_ROW_2_DESCRIPTION"
                        }
                    ]
                    },
                    {
                    "title": "SECTION_2_TITLE",
                    "rows": [
                        {
                        "id": "SECTION_2_ROW_1_ID",
                        "title": "SECTION_2_ROW_1_TITLE",
                        "description": "SECTION_2_ROW_1_DESCRIPTION"
                        },
                        {
                        "id": "SECTION_2_ROW_2_ID",
                        "title": "SECTION_2_ROW_2_TITLE",
                        "description": "SECTION_2_ROW_2_DESCRIPTION"
                        }
                    ]
                    }
                ]
            }
        }
    }
    */
    this.cloudKomerzio.sendMsg(data.config,data.contact,data.type,data._body).then(
      (dto)=>{
        console.log('Llego la promesa al controlador:',dto)
        return res.status(HttpStatus.OK).send(dto);
      }
    ).catch(
      (err)=>{
        console.log('Llego la promesa al controlador:',err)
        return res.status(HttpStatus.OK).send(err);
      }
    )
  }
}


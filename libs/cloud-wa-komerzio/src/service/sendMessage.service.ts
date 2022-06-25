// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpService } from '@nestjs/axios';
export class sendMessage {
  constructor(private HttpService: HttpService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendMsg(config: any, _contact: string, _body: any) {
    this.HttpService.post(
      /* 100350656068712 */
      'https://graph.facebook.com/v13.0/' + config.idBussiness + '/messages',{
        messaging_product: "whatsapp",
        "recipient_type": "individual",
        to: _contact,
        type: "text",
        text:{
          preview_url: _body.preview_url,
          body: _body.body
        }
      },{
        /* EAAT4HsP2hXIBAFaCUDaPbgOEYCcVXyH5ZB5INIGyanLTOj5IhKCZCTPsvqZBLMdSPzZA3BukQySmOkzhmeKK6WvThUFyG2ZCZBZCZBXOclR2TMoEe9ZBATiz4PV2gE2AsSLgH0AmlLzjYNL6NADkJVDKBQMoIh3QOMoCiY64HlZCwuIVLb0i0T3RPnNAkKw5wlZAAYAPAPwgOXU0QZDZD */
        headers: {
          Authorization: 'Bearer ' + config.token,
        },
      },
    )/* .subscribe(
      (res)=>{
        console.log(res)
        return res
      },(err)=>{
        console.log('30:',err)
        return err
      }
    ) */
  }then

  sendImg(config: any, _contact: string, _body: any){

  }
}

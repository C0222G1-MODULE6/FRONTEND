import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FirebaseChat} from '../model/firebase-chat';
import {FirebaseChatService} from '../service/firebase-chat.service';
import {map} from 'rxjs/operators';
import {AuthService} from '../../authentication/service/auth.service';
import {User} from '../../authentication/model/user.model';

@Component({
  selector: 'app-firebase-chat',
  templateUrl: './firebase-chat.component.html',
  styleUrls: ['./firebase-chat.component.css']
})
export class FirebaseChatComponent implements OnInit {
  @ViewChild('chathistory') chathistory: ElementRef;
  scrolltop: number = null;
  username = '';
  userId: number;
  secondUserName = '';
  secondUserId: number;
  userNames: string[] = [];
  users: User[] = [];
  message = '';
  messages: FirebaseChat[] = [];
  chat = {
    chatId: 0,
    message: '',
    username: ''
  };
  chatCode = '';

  constructor(private firebaseChat: FirebaseChatService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllUser();
  }

  getCurrentUser() {
    this.username = sessionStorage.getItem('username');
  }

  getAllUser() {
    this.authService.getAllUsers().subscribe(res => {
      for (const user of res) {
        if (user.userName.toLowerCase() !== sessionStorage.getItem('username')) {
          this.users.push(user);
          this.userNames.push(user.userName);
        } else {
          this.userId = user.userId;
        }
      }
      this.secondUserId = this.users[0].userId;
      this.secondUserName = this.users[0].userName;
      this.setChatCode();
      this.getAllMessages();
    });
  }

  getAllMessages() {
    this.firebaseChat.getAll(this.chatCode).snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}
      )))).subscribe(messages => {
      this.messages = messages;
      setTimeout(() => this.scrolltop = this.chathistory.nativeElement.scrollHeight, 10);
    });
  }

  sendMessage() {
    this.chat.username = this.username;
    this.chat.message = this.message;
    this.setChatCode();
    if (this.messages.length > 0) {
      this.chat.chatId = this.messages[this.messages.length - 1].chatId + 1;
    }
    this.firebaseChat.send(this.chat, this.chatCode, this.chat.chatId);
    this.message = '';
  }

  setSecondUserName(item: string) {
    this.secondUserName = item;
    for (const user of this.users) {
      if (user.userName === this.secondUserName) {
        this.secondUserId = user.userId;
      }
    }
    this.setChatCode();
    this.getAllMessages();
  }

  setChatCode() {
    if (this.userId < this.secondUserId) {
      this.chatCode = this.userId + '' + this.secondUserId;
    } else {
      this.chatCode = this.secondUserId + '' + this.userId;
    }
  }
}

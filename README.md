<div style="text-align:center">

![logo](docs/assets/logo_white.webp#gh-dark-mode-only)
![logo](docs/assets/logo.webp#gh-light-mode-only)

</div>


> A simple WhatsApp Web API (WAPI) that allow you to collect Chat, Contact, and Send Message(s)
## Install

### NPM

```
npm i --save @wayfu/simple-wapi
```

In your app.js import and initialized the module like normal.

```js
import WAPI from "@wayfu/simple-wapi";
```

### Vanilla

If you wish to skip the modular build and NOT use npm you can use the vanilla build like so:

### CDN

```html
<script src="https://unpkg.com/@wayfu/simple-wapi@latest/dist/index.min.js"></script>
```

## How to use it:

```js
/** Initiate WAPI and store it into a variable */
/** Local Variable */
let WwJS = WAPI.init(window);

/** or Global variable */
window.WwJS = WAPI.init(window);
```
You need 1 parameter for initiating WAPI. The parameter should be a `window` instance of the page. You can use this script to inject the WhatsApp Web on the browser too.

## API
### #WAPI
Available properties in `WAPI` class
```ts
WA_VERSION: string; // Current WhatsApp Web Version
WAPI_VERSION: string; // Current Simple-WAPI lib Version
/** HTML classes that web are using */
WebClasses:{
    [k:string]:{ [k:string]: string }
};
ME: WAPI.Contact; // Current contact info
```
Available function in `WAPI` class
```js
/** initiate WAPI */
let WwJS = WAPI.init(window); // Static function to initiating WAPI

/** Checking Phone */
let checked = await WwJS.checkPhone('85726xxx');

/** Finding Chat */
/** There are 2 ways to finding Chat object */
let chat = await WwJS.findChat('85726xxx'); // This will return our Chat object.
let chat = await WwJS.Chat.find('85726xxx'); // This will return WhatsApp Chat object instead.

/** Finding Contact */
/** There are 2 ways to finding Contact object */
let contact = await WwJS.findContact('85726xxx'); // This will return our Contact object.
let contact = await WwJS.Contact.find('85726xxx'); // This will return WhatsApp Contact object instead.

/** Finding Group */
/** There are 2 ways to finding Group object */
let group = await WwJS.findGroup('120363xxx');  // This will return our Group object.
let group = await WwJS.GroupMetadata.find('120363xxx'); // This will return WhatsApp Group object instead.

/** Getting current active chat */
let activeChat = WwJS.getActiveChat(); // This will return our Chat object or null if no chat were active.

/** Getting all Groups Object */
let allGroups = WwJS.getAllGroups(); // This will return Array of our Group object.

/** Opening and closing chat */
await WwJS.openChat('85726xxx'); // for opening chatroom by id
await WwJS.closeChat('85726xxx'); // for closing chatroom by id

/** Opening Chat and send text message to chat */
await WwJS.inputAndSendTextMsg('85726xxx', 'text message'); // This will open the chatroom and send the message

// Sending Message without opening chat window
/** Seindng message */
await WwJS.sendMessage('85726xxx', 'test message'); // Sending a text message to id
await WwJS.sendMessage('85726xxx', 'caption', {media: file}) // Sending a message media to id
await WwJS.sendMessage('85726xxx', '', {media: file, caption: 'caption'}) // Sending a message media to id using caption property

/** Delaying */
await WwJS.sleep(2000); // Delaying for 2 seconds.
```

### #Chat
Available properties in our `Chat` class
```ts
id: ChatId, // ID that represents the chat
isGroup: boolean, // Indicates if the Chat is a Group Chat
active: boolean, // Indicates current active status
hasDraftMessage: boolean, // Indicates current draft message status
name: string, // Title of the chat
timestamp: number, // Unix timestamp for when the last activity occurred
contact: Contact, // Contact model
```
Available function in our `Chat` class
```js
let WwJS = WAPI.init(window);
/** There are 2 ways for getting our Chat class object */
/** Using WAPI.findChat() function */
let chat = await WwJS.findChat('85726xxx');
/** or call `.getModel()` function on WhatsApp Chat object */
let chat = await WwJS.Chat.find('85726xxx')?.getModel();

/**
 * Clearing chat draft message
 * Only work when chat not active or opened
 * this will return `Chat` instance
*/
chat.clearDraft();

/** Opening and closing current chat object */
await chat.open(); // opening chatroom
await chat.close(); // closing chatroom

/** Sending a text message */
await chat.sendText('test message');

/** Sending a message media */
await chat.sendMedia(imgFile, 'caption');
```
#### GroupChat
Group chat is child of `Chat` class with extra properties and function. Available properties in our `GroupChat` class
```ts
/** Group owner */
groupMetadata: GroupMetadata; // GroupMetadata detail

// Getter function
get owner(): Contact | null; // Get owner Contact (if any)
get participants(): GroupParticipant[]; // Group participants
```
### #Contact
Available properties in our `Contact` class
```ts
number: string, // Contact's phone number
isBusiness: boolean, // Indicates if the contact is a business contact
id: ContactId, // ID that represents the contact
isEnterprise: boolean, // Indicates if the contact is an enterprise contact
isGroup: boolean, // Indicates if the contact is a group contact
isUser: boolean, // Indicates if the contact is a user contact
isBlocked: boolean, // Indicates if you have blocked this contact
name: string | undefined, // The contact's name, as saved by the current user
pushname: string, // The name that the contact has configured to be shown publically
shortName: string | undefined, // A shortened version of name

/** Deprecated properties */
isMe: boolean, // Indicates if the contact is the current user's contact
isMyContact: boolean // Indicates if the number is saved in the current phone's contacts
isWAContact: boolean, // Indicates if the number is registered on WhatsApp
```
Available function in our `Contact` class
```js
let WwJS = WAPI.init(window);
/** There are 2 ways for getting our Contact class object */
/** Using WAPI.findContact() function */
let contact = await WwJS.findContact('85726xxx');
/** or call `.getModel()` function on WhatsApp Contact object */
let contact = await WwJS.Contact.find('85726xxx')?.getModel();

/** Returns the Chat that corresponds to this Contact. */
let chat = await contact.getChat();

/** 
 * Gets the Contact's common groups with you. Returns empty array if you don't have any common group.  */
let commonGroup = await contact.getCommonGroups();
```
### #Group
Available properties in our `Group` class
```ts
announce: boolean; /** Indicates if the group is Announcement Group */
creation: number; /** Group creation timestampt */
desc: string; /** Group Description */
descId: string; /** Group Description Id */
descOwner: ContactId; /** Group Description Owner Contact Id */
descTime: number; /** Group Description Updated Timestampt */
displayedDesc: string; /** Group Displayed Description */
groupType: string; /** Group Type */
id: GroupId; /** Group Id */
name: string; /** Group subject name */
owner: ContactId; /** Group Owner ContactId */
parentGroupId: GroupId; /** Parent GroupId */
size: number; /** Group Participant Size */
subGroupsId: GroupId[]; /** All Sub Groups Id */

// Getter Functions
get participants(): GroupParticipant[]; /** Group participants */
get parentGroup(): Group | null; /** Get parent group as Group object */
get childGroups(): Group[]; /** Get all Child group as Array of Group object */
```
Available function in our `Group` class
```js
let WwJS = WAPI.init(window);
/** There are 2 ways for getting our Group class object */
/** Using WAPI.findGroup() function */
let group = await WwJS.findGroup('120363xxx');
/** or call `.getModel()` function on WhatsApp GroupMetadata object */
let group = await WwJS.GroupMetadata.find('120363xxx')?.getModel();

/** Returns the Chat that corresponds to this Group. */
let chat = await group.getChat();
/** Returns the Contact that corresponds to this Group. */
let contact = await group.getContact();
/** Open and return the chat that corresponds to this group */
let chat = await group.openChat();
```
## TypeScript

This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.

## License
Copyright &copy; 2023 [Wayfu](https://github.com/wayfu-id) under [ISC](LICENSE) License
# er model pic
![ermodell_1](uploads/f0e046b855678b9aedcd20b719af1778/ermodell_1.png)
# er model 
## User
- PK: user_id not null
- email not null varchar(50)
- password not null varchar(50)
- isAdmin not null boolean
- refreshtoken varchar(255)
- confirmationToken varchar(255)
- forgotToken varchar(255)
- forgotExpires Timestamp

## Drawer
- PK: user_id not null
- FK: drawer_id not null
- drawertitle not null varchar(50)
- creationdate not null Timestamp
- drawerlogo bytea

## Drawerentries
- PK: drawerentry_id not null
- FK: drawer_id not null
- creationdate not null Timestamp
- comment
- imageURL Text[]
- videoURL Text[]
- websiteContent Text
- seltext varchar
- originURL varchar(255)
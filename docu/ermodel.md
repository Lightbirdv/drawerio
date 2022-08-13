# er model pic
![ermodell_1](https://user-images.githubusercontent.com/56518155/184482291-df03c224-6f15-45a8-9e2c-9bfcc93817d7.png)
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

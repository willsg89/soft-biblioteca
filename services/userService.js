// const login = (loginRequest) => {
//   try {
//     const client = ldap.createClient({
//       url: 'ldap://antartida:389',
//     });
//       // search ,OU=Softdesign,DC=softdesign-rs,DC=com,DC=BR
//     client.bind('william.guimaraes@softdesign.com.br', '*****', (err2) => {
//       if (err2) {
//         console.log('err2: ', err2);
//       }
//       client.unbind((err3) => {
//         if (err3) {
//           console.log('err3: ', err3);
//         }
//       });
//     });
//     // console.log('client: ', client);
//   } catch (e) {
//     console.log('err: ', e);
//   }
// };

// module.exports.login = login;

// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   NotFoundException,
// } from '@nestjs/common';
// import { from, Observable, switchMap, forkJoin } from 'rxjs';
// import { UserDocument } from 'src/modules/user/entities/user.entity';
// import { FantasyService } from 'src/modules/yahoo/fantasy.service';

// @Injectable()
// export class TokenInterceptor implements NestInterceptor {
//   constructor(private readonly fantasyService: FantasyService) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     const user: UserDocument = request.user;

//     const yahooAccounts = user.yahooAccounts;

//     // Check if there are no Yahoo accounts connected
//     if (!yahooAccounts || yahooAccounts.length === 0) {
//       console.log('No Yahoo accounts connected');
//       throw new NotFoundException('No Yahoo accounts connected');
//     }

//     // Map over Yahoo accounts to refresh tokens if necessary
//     const refreshTokenObservables = yahooAccounts.map((account) => {
//       const { accessToken, refreshToken, expiresAt } = account;

//       if (this.isTokenExpired(expiresAt)) {
//         // If the access token is expired, create an observable to refresh it
//         return from(
//           this.fantasyService.refreshYahooToken(user.id, refreshToken),
//         ).pipe(
//           switchMap((newAccessToken) => {
//             // Update the access token for the specific account
//             account.accessToken = newAccessToken?.accessToken;
//             account.expiresAt = Date.now() + 60 * 60 * 1000; // Assuming 1 hour expiry
//             return [newAccessToken]; // Emit the new token
//           }),
//         );
//       } else {
//         // If the token is valid, return an observable that emits the current access token
//         return from(Promise.resolve(accessToken));
//       }
//     });

//     // Wait for all token refresh operations to complete
//     return forkJoin(refreshTokenObservables).pipe(
//       switchMap(() => {
//         console.log('All tokens refreshed successfully');
//         request.user = user;
//         // Uncomment this if you want to save the user after refreshing tokens
//         // await user.save();
//         return next.handle(); // Proceed with the next handler
//       }),
//     );
//   }

//   private isTokenExpired(expiresAt: number): boolean {
//     if (!expiresAt) {
//       return true;
//     }
//     const currentTime = Date.now(); // Get the current time in milliseconds
//     return currentTime >= expiresAt; // Return true if the current time is greater than or equal to expiresAt
//   }
// }

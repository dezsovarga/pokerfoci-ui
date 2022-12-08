import { rest } from "msw";

function login() {
    return rest.post('http://localhost:8081/account/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    username: 'bogikaaa',
                    bearerToken: 'eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmxlSEFpT2pFMk5qZ3hOell3Tnprc0luTjFZaUk2SW1KdloybEFkbUZ5WjJFdVkyOXRJaXdpY205c1pYTWlPaUoxYzJWeUlpd2lhV0YwSWpveE5qWTJPVFkyTkRjNWZRLi1mUDNjNm4wYTlQd3l5NW5EeXlFNGlRdWx2MGJCRFhweEdzeTZlS0FZZVEiLCJ1c2VybmFtZSI6ImJvZ2lAdmFyZ2EuY29tIn0'}
            )
        );
    });
}

function signup() {
    return rest.post('http://localhost:8081/account/register', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    confirmToken: 'eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SndaWEp0SWpvaWUxd2lZV05qYjNWdWRFUjBiMXdpT250Y0luVnpaWEp1WVcxbFhDSTZYQ0oyYVc1cGRHOXlYQ0lzWENKbGJXRnBiRndpT2x3aWRtbHVhWFJ2Y2tCMllYSm5ZUzVqYjIxY0lpeGNJbkJoYzNOM2IzSmtYQ0k2WENKMmFXNXBkRzl5WENJc1hDSmpiMjVtYVhKdFVHRnpjM2R2Y21SY0lqcGNJblpwYm1sMGIzSmNJbjBzWENKMlpYSnBabWxqWVhScGIyNU1hVzVyWENJNmJuVnNiQ3hjSW1OdmJtWnBjbTFVYjJ0bGJsd2lPbTUxYkd4OUlpd2laWGh3SWpveE5qWTRPRGN5TURBNExDSnpkV0lpT2lKMmFXNXBkRzl5UUhaaGNtZGhMbU52YlNJc0luSnZiR1Z6SWpvaWRYTmxjaUlzSW1saGRDSTZNVFkyT0RjNE5UWXdPSDAuREV5b2JMX0U3YlZhNElVZERUOHktYmhla0pYbHZMTWJTOUFxSVFMcXNGbyIsInVzZXJuYW1lIjoidmluaXRvckB2YXJnYS5jb20ifQ',
                    verificationLink: 'http://localhost:3000/activate-account/eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SndaWEp0SWpvaWUxd2lZV05qYjNWdWRFUjBiMXdpT250Y0luVnpaWEp1WVcxbFhDSTZYQ0oyYVc1cGRHOXlYQ0lzWENKbGJXRnBiRndpT2x3aWRtbHVhWFJ2Y2tCMllYSm5ZUzVqYjIxY0lpeGNJbkJoYzNOM2IzSmtYQ0k2WENKMmFXNXBkRzl5WENJc1hDSmpiMjVtYVhKdFVHRnpjM2R2Y21SY0lqcGNJblpwYm1sMGIzSmNJbjBzWENKMlpYSnBabWxqWVhScGIyNU1hVzVyWENJNmJuVnNiQ3hjSW1OdmJtWnBjbTFVYjJ0bGJsd2lPbTUxYkd4OUlpd2laWGh3SWpveE5qWTRPRGN5TURBNExDSnpkV0lpT2lKMmFXNXBkRzl5UUhaaGNtZGhMbU52YlNJc0luSnZiR1Z6SWpvaWRYTmxjaUlzSW1saGRDSTZNVFkyT0RjNE5UWXdPSDAuREV5b2JMX0U3YlZhNElVZERUOHktYmhla0pYbHZMTWJTOUFxSVFMcXNGbyIsInVzZXJuYW1lIjoidmluaXRvckB2YXJnYS5jb20ifQ'
                })
        );
    });
}

function activateAccount() {
    return rest.get('http://localhost:8081/account/register/confirm/:confirmToken', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    username: 'boglarka',
                    bearerToken: 'eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmxlSEFpT2pFMk5qZ3hOell3Tnprc0luTjFZaUk2SW1KdloybEFkbUZ5WjJFdVkyOXRJaXdpY205c1pYTWlPaUoxYzJWeUlpd2lhV0YwSWpveE5qWTJPVFkyTkRjNWZRLi1mUDNjNm4wYTlQd3l5NW5EeXlFNGlRdWx2MGJCRFhweEdzeTZlS0FZZVEiLCJ1c2VybmFtZSI6ImJvZ2lAdmFyZ2EuY29tIn0'
                })
        );
    });
}

function changePassword() {
    return rest.post('http://localhost:8081/account/change-password', (req, res, ctx) => {
        return res(
            ctx.status(200),
        );
    });
}

export const handlers = [login(), signup(), activateAccount(), changePassword()];
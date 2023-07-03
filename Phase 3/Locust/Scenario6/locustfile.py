from locust import task, run_single_user
from locust import FastHttpUser


class myharfile(FastHttpUser):
    host = "http://localhost"
    default_headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
    }

    @task
    def t(self):
        with self.client.request(
            "POST",
            "/humhub/index.php?r=user%2Fauth%2Flogout",
            headers={
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
                "Cache-Control": "max-age=0",
                "Connection": "keep-alive",
                "Content-Length": "98",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "Phpstorm-69a93abe=e54fd037-b8fd-433b-8117-e5450ce6bbbd; language=bb6ce3163c1f588e67bf425ac15e954b7b2dba33b884af94990c7579c2f94236a%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22language%22%3Bi%3A1%3Bs%3A5%3A%22en-US%22%3B%7D; PHPSESSID=a87fcbosour8n38182uf5gpuo7; _identity=7d4ef5b5cbba29f70bce865053673343fb924eee158f220a0f41b6483e61503fa%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A46%3A%22%5B1%2C%22Tfg7zgfZzz6i0xkN2JpSZEh2Y-BeSJCk%22%2C2592000%5D%22%3B%7D; _csrf=2c2a0db06ab6a13968abe5f81d9b2dc63b98a8fafbbc8f6c2b703bb4e200c0c5a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22P_SaaThKYciHEkPrRx_DybsaHppGS96o%22%3B%7D",
                "Host": "localhost",
                "Origin": "http://localhost",
                "Referer": "http://localhost/humhub/index.php?r=space%2Fspace&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1",
            },
            data="_csrf=gSwKPKeyTT6atUcfGzwMydlSiHuROSoMI03UvHCdWrDRc1ldxuYldcPWLldeV1y7iyrXP-hbWW1rPaT7I6Rs3w%3D%3D",
            catch_response=True,
        ) as resp:
            pass
            
            

        with self.client.request(
            "GET",
            "/humhub/index.php?r=space%2Fmembership%2Finvite&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            catch_response=True,
        ) as resp:
            pass
        with self.client.request(
            "POST",
            "/humhub/index.php?r=space%2Fmembership%2Finvite&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            headers={
                "Content-Length": "392",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "http://localhost",
            },
            data="_csrf=8I1qO0ZHtJIH3MDUFUQw9NXUdenIc2hLOrrVdwaBZvSy_yVhdnLW53e6hJBPHmeeo5cTg7k8LC9Lw4EUNOkRpA%3D%3D&InviteForm%5Binvite%5D=&InviteForm%5BwithoutInvite%5D=0&InviteForm%5BallRegisteredUsers%5D=0&InviteForm%5BallRegisteredUsers%5D=1&InviteForm%5BinviteEmails%5D=&secureLink=http%3A%2F%2Flocalhost%2Fhumhub%2Findex.php%3Fr%3Duser%252Fregistration%252Fby-link%26token%3DizrLkIrlItKOqf%26spaceId%3D1",
            catch_response=True,
        )as resp:
            pass




        with self.client.request(
            "GET",
            "/humhub/index.php?r=dashboard%2Fdashboard",
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "http://localhost",
                "Referer": "http://localhost/humhub/index.php?r=space%2Fspace&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
                "Upgrade-Insecure-Requests": "1",
            },
            catch_response=True,
        ) as resp:
            pass
        with self.client.request(
            "GET",
            "/humhub/index.php?r=user%2Fauth%2Flogin",
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "http://localhost",
                "Referer": "http://localhost/humhub/index.php?r=space%2Fspace&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
                "Upgrade-Insecure-Requests": "1",
            },
            catch_response=True,
        ) as resp:
            pass
        with self.client.request(
            "GET",
            "/humhub/assets/siteicons/192x192.png?v=1685987965",
            headers={
                "Referer": "http://localhost/humhub/index.php?r=user%2Fauth%2Flogin"
            },
            catch_response=True,
        ) as resp:
            pass


if __name__ == "__main__":
    run_single_user(myharfile)

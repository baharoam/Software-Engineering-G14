from locust import task, run_single_user
from locust import FastHttpUser


class post(FastHttpUser):
    host = "http://localhost"
    default_headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
        "Connection": "keep-alive",
        "Content-Length": "238",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "Phpstorm-69a93abe=e54fd037-b8fd-433b-8117-e5450ce6bbbd; language=bb6ce3163c1f588e67bf425ac15e954b7b2dba33b884af94990c7579c2f94236a%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22language%22%3Bi%3A1%3Bs%3A5%3A%22en-US%22%3B%7D; _identity=7d4ef5b5cbba29f70bce865053673343fb924eee158f220a0f41b6483e61503fa%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A46%3A%22%5B1%2C%22Tfg7zgfZzz6i0xkN2JpSZEh2Y-BeSJCk%22%2C2592000%5D%22%3B%7D; PHPSESSID=ou1gmbt4dhbbfk9rt8i7bbqagm; _csrf=9a9bd89b55a1ad147048b30786da06d49d84a751907dd734814f97d302b1a503a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22sQMgVxW_TOuXbc3CNji76RDdIPdxj81L%22%3B%7D",
        "Host": "localhost",
        "Origin": "http://localhost",
        "Referer": "http://localhost/humhub/index.php?r=space%2Fspace&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
        "X-CSRF-Token": "Bzm6OKzH1vUJJ1OjYZbHy4jrfoNb14aiTrPC_JDU0iR0aPdf-r-Bql1oJvsD9fSIxoEXtG2FwsYH46aE-uzjaA==",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
    }

    @task
    def t(self):
        with self.client.request(
            "POST",
            "/humhub/index.php?r=post%2Fpost%2Fpost&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            data="_csrf=C3pgx9XaE_dugJ1DO3rz7Th_PmhU9EzKmhjuP1JVWJJ4Ky2gg6JEqDrP6BtZGcCudhVXX2KmCK7TSIpHOG1p3g%3D%3D&Post%5Bmessage%5D=hello&containerGuid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea&containerClass=humhub%5Cmodules%5Cspace%5Cmodels%5CSpace&state=1",
            catch_response=True,
        ) as resp:
            pass


if __name__ == "__main__":
    run_single_user(post)

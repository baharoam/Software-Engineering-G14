from locust import task, run_single_user
from locust import FastHttpUser


class editpost(FastHttpUser):
    host = "http://localhost"
    default_headers = {
        "Accept": "text/html, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
        "Connection": "keep-alive",
        "Cookie": "Phpstorm-69a93abe=e54fd037-b8fd-433b-8117-e5450ce6bbbd; language=bb6ce3163c1f588e67bf425ac15e954b7b2dba33b884af94990c7579c2f94236a%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22language%22%3Bi%3A1%3Bs%3A5%3A%22en-US%22%3B%7D; PHPSESSID=2e80b447mcamh16a4jgkhob5gc; _identity=7d4ef5b5cbba29f70bce865053673343fb924eee158f220a0f41b6483e61503fa%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A46%3A%22%5B1%2C%22Tfg7zgfZzz6i0xkN2JpSZEh2Y-BeSJCk%22%2C2592000%5D%22%3B%7D; _csrf=882cbb3d8aeb3a668f8e70377a519dcc216bc9bddeb849d14f81322059bbadcba%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22GTzrLBkEpDIoYRjGmVjdrLuXGL07UBuy%22%3B%7D",
        "Host": "localhost",
        "Referer": "http://localhost/humhub/index.php?r=space%2Fspace&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
        "X-CSRF-Token": "-flQ8n-M0XJwhsjiF0E9_Tqgw9A3NG1-ciXDB6-lJoe-rSqAM866NwDCgY1OE1e6V_aptEV4GCY1afMw-udT_g==",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
    }

    @task
    def t(self):
        with self.client.request(
            "GET",
            "/humhub/index.php?r=post%2Fpost%2Fedit&id=5&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            catch_response=True,
        ) as resp:
            pass
        with self.client.request(
            "POST",
            "/humhub/index.php?r=post%2Fpost%2Fedit&id=5&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            headers={
                "Content-Length": "329",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "http://localhost",
            },
            data="_csrf=eNGJQgsdmqZyGUID-Whzi9576rRNhzame-NvS3_rwgM_hfMwR1_x4wJdC2ygOhnMsy2A0D_LQ_48r198Kqm3eg%3D%3D&Post%5Bmessage%5D=Beautiful+%23Moon+%23Night%0D%0A%0D%0Aphoto+by+%5BSara+Schuster%5D(mention%3A3163d115-8d19-43f6-bf29-a7f7ab61ab3e+%22%2Fhumhub%2Findex.php%3Fr%3Duser%252Fprofile%26cguid%3D3163d115-8d19-43f6-bf29-a7f7ab61ab3e%22)",
            catch_response=True,
        ) as resp:
            pass


if __name__ == "__main__":
    run_single_user(editpost)

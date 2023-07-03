from locust import task, run_single_user
from locust import FastHttpUser


class like(FastHttpUser):
    host = "http://localhost"
    default_headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
        "Connection": "keep-alive",
        "Content-Length": "0",
        "Cookie": "Phpstorm-69a93abe=e54fd037-b8fd-433b-8117-e5450ce6bbbd; language=bb6ce3163c1f588e67bf425ac15e954b7b2dba33b884af94990c7579c2f94236a%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22language%22%3Bi%3A1%3Bs%3A5%3A%22en-US%22%3B%7D; PHPSESSID=n7b3k5dr3564hbe981ei0la70j; _identity=7d4ef5b5cbba29f70bce865053673343fb924eee158f220a0f41b6483e61503fa%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A46%3A%22%5B1%2C%22Tfg7zgfZzz6i0xkN2JpSZEh2Y-BeSJCk%22%2C2592000%5D%22%3B%7D; _csrf=ac1e25c73183ae8602165f4c14d562e5239b6760f271cbc111c06125e41949bda%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22lCRffG4pbU2XkBEvaR4Lz13GdASYjaCM%22%3B%7D",
        "Host": "localhost",
        "Origin": "http://localhost",
        "Referer": "http://localhost/humhub/index.php?r=space%2Fspace&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
        "X-CSRF-Token": "6721YkVnjVfvkigCcdemmrVTPRB3CS0G55x6Vll2ZA2H_ucEIyC5J43HGloalePs1AEJXA04HkGD3SkPMxcnQA==",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
    }

    @task
    def t(self):
        with self.rest(
            "POST",
            "/humhub/index.php?r=like%2Flike%2Flike&contentModel=humhub%5Cmodules%5Ccomment%5Cmodels%5CComment&contentId=2",
        ) as resp:
            pass


if __name__ == "__main__":
    run_single_user(like)

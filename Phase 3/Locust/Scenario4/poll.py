from locust import task, run_single_user
from locust import FastHttpUser


class poll(FastHttpUser):
    host = "http://localhost"
    default_headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
        "Connection": "keep-alive",
        "Cookie": "Phpstorm-69a93abe=e54fd037-b8fd-433b-8117-e5450ce6bbbd; language=bb6ce3163c1f588e67bf425ac15e954b7b2dba33b884af94990c7579c2f94236a%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22language%22%3Bi%3A1%3Bs%3A5%3A%22en-US%22%3B%7D; PHPSESSID=fbgn7qtu3osrk0o71eopromk6m; _identity=7d4ef5b5cbba29f70bce865053673343fb924eee158f220a0f41b6483e61503fa%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A46%3A%22%5B1%2C%22Tfg7zgfZzz6i0xkN2JpSZEh2Y-BeSJCk%22%2C2592000%5D%22%3B%7D; _csrf=82dfaf681fe26b4f79f34ef6d2b1ab3e65a8669d951f43672530249bb7766498a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22BrOZ05bupfDDZZWjvCfjqODdqyTc2hwP%22%3B%7D",
        "Host": "localhost",
        "Origin": "http://localhost",
        "Referer": "http://localhost/humhub/index.php?r=space%2Fspace&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
        "X-CSRF-Token": "8BDrVo4BtkwY-gSrhOxcB-hd48DQozliaEFWOqmrfDuyYqQMvjTUOWicQO_etgttnh6FqqHsfQYZOAJZm8MLaw==",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
    }

    @task
    def t(self):
        with self.client.request(
            "POST",
            "/humhub/index.php?r=polls%2Fpoll%2Fanswer&pollId=1&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            headers={
                "Content-Length": "108",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            data="_csrf=s2_j57ES-nzukyE9jeQUtNSvPgpFi2SOhj5dqcZnpB7xHay9gSeYCZ71ZXnXvkPeouxYYDTEIOr3RwnK9A_TTg%3D%3D&answers=1",
            catch_response=True,
        ) as resp:
            pass
        with self.rest(
            "POST",
            "/humhub/index.php?r=polls%2Fpoll%2Fanswer-reset&pollId=1&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            headers={"Content-Length": "0"},
        ) as resp:
            pass
        with self.client.request(
            "POST",
            "/humhub/index.php?r=polls%2Fpoll%2Fanswer&pollId=1&cguid=d0a4fb3b-2ddd-4f61-9c86-13e4561739ea",
            headers={
                "Content-Length": "108",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            data="_csrf=CNLXkGeLrbehz4wiqImJMjkNa7zn6AN-RwVqpAuMEvRKoJjKV77PwtGpyGby095YT04N1panRxo2fD7HOeRlpA%3D%3D&answers=2",
            catch_response=True,
        ) as resp:
            pass



if __name__ == "__main__":
    run_single_user(poll)

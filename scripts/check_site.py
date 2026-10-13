"""Check the static site's local links and required publication metadata."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.headings = 0
        self.language = None
        self.copy_targets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.language = attrs.get("lang")
        if tag == "h1":
            self.headings += 1
        if "id" in attrs:
            if attrs["id"] in self.ids:
                raise ValueError(f"Duplicate id: {attrs['id']}")
            self.ids.add(attrs["id"])
        for attr in ("href", "src", "poster"):
            if attr in attrs:
                self.links.append(attrs[attr])
        if tag == "img" and not attrs.get("alt"):
            raise ValueError("Content images require descriptive alt text")
        if "data-copy-target" in attrs:
            self.copy_targets.append(attrs["data-copy-target"])


def main():
    root = Path(__file__).resolve().parents[1] / "site"
    pages = {}
    for path in root.rglob("*.html"):
        page = Page()
        page.feed(path.read_text(encoding="utf-8"))
        if page.language != "en" or page.headings != 1:
            raise ValueError(f"{path}: requires lang=en and exactly one h1")
        pages[path.resolve()] = page
    if not pages:
        raise ValueError("No HTML pages found")

    checked = 0
    for path, page in pages.items():
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            if url.path.startswith("/"):
                raise ValueError(f"{path}: root-relative URL breaks project Pages: {link}")
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            if not target.is_relative_to(root.resolve()):
                raise ValueError(f"{path}: link escapes published site: {link}")
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                raise ValueError(f"{path}: missing local file: {link}")
            if url.fragment and target in pages:
                if unquote(url.fragment) not in pages[target].ids:
                    raise ValueError(f"{path}: missing anchor: {link}")
            checked += 1

    for path, page in pages.items():
        text = path.read_text(encoding="utf-8")
        for required in ("University of Oxford", "IT Services", "Digital Capabilities",
                         "https://creativecommons.org/licenses/by-nc-sa/4.0/"):
            if required not in text:
                raise ValueError(f"{path}: missing publication credit or license: {required}")
        for target in page.copy_targets:
            if target not in page.ids:
                raise ValueError(f"{path}: missing copy target: {target}")
    print(f"Validated {len(pages)} HTML page(s), {checked} local links, credits and license.")


if __name__ == "__main__":
    main()

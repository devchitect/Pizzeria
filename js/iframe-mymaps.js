
    const mapbox = document.querySelector(".map-box")

    const map = document.createElement("iframe")

    map.src = "https://www.google.com/maps/d/u/0/embed?mid=1wFueh0M7Yocw3lZorvX3ebPmDJxW8-E&ehbc=2E312F";
    map.className = "iframe-map"

    mapbox.appendChild(map)

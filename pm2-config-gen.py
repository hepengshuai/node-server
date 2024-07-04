from jinja2 import Environment, FileSystemLoader


def generate_deploy_config():
    # 创建一个 Jinja2 的 Environment 对象，指定模板文件所在的文件夹
    env = Environment(loader=FileSystemLoader('.'))

    # 定义要传递给模板的数据
    data = {
        'server_ip': '1.1.1.1'
    }

    items = []
    port = 56201
    for i in range(201, 401):
        items.append({
            "ins_name": 'ins%03d' % i,
            "port": port
        })
        port = port + 1

    data['items'] = items

    # 渲染模板并获取渲染后的结果
    template = env.get_template('pm2-config.js.template')
    output = template.render(data)

    # 将渲染后的结果写入到一个 HTML 文件中
    with open('ecosystem.config.js', 'w') as file:
        file.write(output)


def generate_nginx_config():
    # 创建一个 Jinja2 的 Environment 对象，指定模板文件所在的文件夹
    env = Environment(loader=FileSystemLoader('.'))

    # 定义要传递给模板的数据
    data = {
        'ip': '1.1.1.1'
    }

    items = []
    port = 56201
    for i in range(201, 401):
        items.append({
            "port": port
        })
        port = port + 1

    data['items'] = items

    # 渲染模板并获取渲染后的结果
    template = env.get_template('nginx-conf.template')
    output = template.render(data)

    # 将渲染后的结果写入到一个 HTML 文件中
    with open('server.conf', 'w') as file:
        file.write(output)


def copy_user_data():
    source_dir = '/data/tmp/'
    dest_dir = '/data1/tmp/'
    for i in range(1, 200):
        s = source_dir + 'ins%03d/Default' % i
        d = dest_dir + 'ins%03d/' % (i + 200)
        print(f'rm -rf {d}Default')
        print(f'copy -a {s} {d}')


generate_deploy_config()
copy_user_data()


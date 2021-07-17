k8s_yaml([
  './k8s/base/auth-service.yml',
  './k8s/base/auth-mongo.yml',
  './k8s/base/user-service.yml',
  './k8s/base/user-mongo.yml',
  './k8s/base/stan.yml',
  './k8s/dev/ingress.yml',
  './k8s/dev/secret.yml',
])

if config.tilt_subcommand == 'up':
  k8s_yaml([
    './k8s/dev/auth-pvc.yml',
    './k8s/dev/user-pvc.yml',
    './k8s/dev/stan-pvc.yml',
  ])

docker_build(
  'pramindanata/sc-auth',
  'services/auth',
  dockerfile='./services/auth/Dockerfile'
)

docker_build(
  'pramindanata/sc-user',
  'services/user',
  dockerfile='./services/user/Dockerfile'
)

k8s_resource('auth-mongo', port_forwards='27001:27017')
k8s_resource('user-mongo', port_forwards='27002:27017')
k8s_resource('stan', port_forwards='8222:8222')